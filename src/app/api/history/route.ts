import { firestore, adminAuth } from 'app/_lib/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const historySnapshot = await firestore
      .collection('requestHistory')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .get();

    const history = historySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        duration: data.duration,
        statusCode: data.statusCode,
        method: data.method,
        requestSize: data.requestSize || 0,
        responseSize: data.responseSize || 0,
        endpoint: data.endpoint,
        url: data.url,
        timestamp: data.timestamp.toDate().toISOString(),
        error: data.error,
        requestDetails: data.requestDetails || undefined,
      };
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    if (error instanceof Error && error.message.includes('auth/')) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
