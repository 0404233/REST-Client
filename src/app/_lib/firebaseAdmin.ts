import admin, { ServiceAccount } from 'firebase-admin';

const serviceAccount = {
  type: 'service_account',
  project_id: 'rest-client-293ec',
  private_key_id: '5fa23dc90bed4a1f5e2fe884e99bdad5d40fadd7',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC3cLo/vEgpaspU\npoErUV1NwJHqRwSwrbMTNGvaIW23MZ9MLonROnbXHSc/iekgTM4VnOIhAnWGfw/o\n2Ke1cLlIOs7tEGF/LHOauEiJdQhYir2vBNtObDTGj12q8crA2BXPM6neFx6fNWUQ\nN7A9UrYcAyFETrltmE+Du1n5HpXGcN5GmUm413Ofl6ELQuNTqFyTj+dprCHQd5Ir\nnWZPYhRoMFSE4rveiZdtw1gWt7cxniRHTmfoJFih5JbSydYImhT1bggoD63xo/5E\naor+DwNWEclKtcVD35TKRRcDIEaOzh/UiFod5pk5QLaWSk3bCDUMm4ODyGZidjNN\nAPZNd2svAgMBAAECggEANmoljX98BnErqLWljmR54XUUs6KydPhprPI5ZgDRi2yY\nXOBXOG33z7LRsCroMREndsjNWU5h724kmYUfJpbUF2V+eVsJGNDmUAiHV+MUATPS\ntaaiqV42v4nKlslXxCG1QnwIUR2Zk0+i9Y8XY/FznNae2STjI2vxdlmuhFP6yNyz\nhvE7HSY4LVVuauQecJvQwJZyBJaIdBjFQ4FoAD1mIPqFTf2ScWyayu5BasekUfef\nhZurMJrMEUjL61dBT4mfH8lLf8mESfXZ9YORX6SacQRAQw5qGtIhbSktv6nVUlp9\nSNrGoetbfI7/XzICv62Vf8Juz5uTFZccoDl9wkOENQKBgQD4ZV+awmaKQHtGMdc0\nxDkg0yQvBQ2QzePfUWaeM9gFG+B8KKwfJV+MADijw3+Px8UsyKIiTrZ1SkhOzxTC\nqxMpxxxo9DkFk2npk5NM1XDnc8SQuLVLkkvI7P2C+l6kuF29+nhBdIQyMipy5L6V\nQ9ZC/oPKPd5HLd8hucTIaL+LcwKBgQC9Dk97o/TccjC5GrcxDlW6Yv68wgdXFKQa\nCUaLTPYpJ+SLoLyU5r1Iueylcb/ds7WyBZ67GOSPLOg9jpXdVOOzdBsTHbqEDnov\ngo22RyRphEHQQL53enAt33HFXXRQb1AyZs5H6fFJicbd1xIV3csDM80eB8z/WwNL\n+PWVcj3qVQKBgAXXNGFKMukLTRrAb0QBXSqFbHNilggSn0oP+u67X1f3aNbiifGN\nimqbUrmfDi/OTbeY3B8cZLPrVDnuKpnNNf0kfmmFXJXh+nqQisUiu63ljfitLy4g\nuYF2+RsMUg9jemjOK+e2GqmnflIHSOfvmWkn3OdzfveDf5ymZpcjx2U7AoGAXvt3\nl2iyNqbwL69qZi0LiQ7/aJoa0fc+0w3h8U6DRf4S5sukszKR2p3+dMiHWr1VBdGp\nA9rnyb8IFxUx2fcyRxCIIbyH3pzfaksvI2ruskyOPDCrAJ/1CDcAk+X18AtcwVXB\nQYQZg5bC4OWS4oWB32QBI5tLtOdm6p5z09eHn9kCgYBTMSbOxCcj4+BQBy8GdbYq\nnCEbR/N/v2xRsmWRUarU5NM4C9espNzHh1kzN209H4W8FOxknk9HdjsMOnq3fJPl\no0IANDVmNHKy7Yri5OXOM+Hfks3QMGEOEAG9R6vg+CNcNewfhH/AFogQiQ+0VznG\nFDn4b7e4+T3fKyVfGDsk7Q==\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-fbsvc@rest-client-293ec.iam.gserviceaccount.com',
  client_id: '113660689895438304129',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40rest-client-293ec.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
  } catch (error) {
    console.error('Firebase initialization error', error);
  }
}

const firestore = admin.firestore();
const adminAuth = admin.auth();

export { firestore, adminAuth };
