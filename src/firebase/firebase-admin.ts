import * as admin from 'firebase-admin';
import { serviceAccount } from '../config/firebase-service-account';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export { admin };
