'use client';

import React, { useEffect, useState } from 'react';
import TemplateSignedIn from '../../_components/template-signed-in/TemplateSignedIn';
import TemplateNotSignedIn from '../../_components/template-not-signed-in/TemplateNotSignedIn';
import { useAuth } from '../../_context/AuthContext';

export type Variable = { name: string; value: string };

export function substituteVariables(str: string, variables: Variable[]): string {
  return str.replace(/{{\s*([\w\d_]+)\s*}}/g, (_, varName) => {
    const found = variables.find((v) => v.name === varName);
    return found ? found.value : '';
  });
}

const LOCAL_STORAGE_KEY = 'rest-client-variables';

function loadVariables(): Variable[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveVariables(vars: Variable[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(vars));
}

function VariablesContent() {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    setVariables(loadVariables());
  }, []);

  useEffect(() => {
    saveVariables(variables);
  }, [variables]);

  const handleAddOrEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newVar: Variable = { name: name.trim(), value };
    if (editIndex !== null) {
      const updated = [...variables];
      updated[editIndex] = newVar;
      setVariables(updated);
      setEditIndex(null);
    } else {
      setVariables([...variables, newVar]);
    }
    setName('');
    setValue('');
  };

  const handleEdit = (idx: number) => {
    setEditIndex(idx);
    setName(variables[idx].name);
    setValue(variables[idx].value);
  };

  const handleDelete = (idx: number) => {
    setVariables(variables.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setEditIndex(null);
      setName('');
      setValue('');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h1>Variables</h1>
      <p>
        You can define variables and use them in your requests as <code>{'{{variableName}}'}</code>.
        <br />
        Example: <code>{'https://api.com/{{packageName}}'}</code>, header:{' '}
        <code>{'{{AUTH_TOKEN}}'}</code>, body: <code>{'{"foo": "{{BAR}}"}'}</code>
      </p>
      <form onSubmit={handleAddOrEdit} style={{ marginBottom: 24 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          style={{ marginRight: 8 }}
        />
        <button type="submit">{editIndex !== null ? 'Save' : 'Add'}</button>
        {editIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditIndex(null);
              setName('');
              setValue('');
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'left' }}>Value</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {variables.map((v, idx) => (
            <tr key={v.name}>
              <td>
                <code>{v.name}</code>
              </td>
              <td>
                <code>{v.value}</code>
              </td>
              <td>
                <button onClick={() => handleEdit(idx)}>Edit</button>
                <button onClick={() => handleDelete(idx)} style={{ marginLeft: 8 }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {variables.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', color: '#888' }}>
                No variables yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function VariablesPage() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <TemplateNotSignedIn />;
  return (
    <TemplateSignedIn user={user}>
      <VariablesContent />
    </TemplateSignedIn>
  );
}
