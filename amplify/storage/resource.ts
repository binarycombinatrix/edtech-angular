import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'edtech-storage',
  access: (allow) => ({
    'media/*': [
      allow.groups(['STUDENT']).to(['read']),
      allow.groups(['TEACHER']).to(['read', 'write', 'delete']),
    ],
  }),
});
