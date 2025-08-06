import Dexie from 'dexie';

// Define your database
export const db = new Dexie('MinistryRecordsDB');
db.version(1).stores({
  drafts: '++id, type, updatedAt', // type: 'fieldRecord' | 'returnVisit' | ...
  analytics: 'key', // key: string (e.g. 'dashboard')
  upcoming: 'key', // key: string (e.g. 'upcomingVisitsList')
});

// Example: Save a draft
export async function saveDraft(type, data) {
  await db.drafts.put({
    type,
    data,
    updatedAt: new Date().toISOString(),
  });
}

// Example: Get all drafts of a type
export async function getDrafts(type) {
  return db.drafts.where('type').equals(type).toArray();
}

// Example: Save analytics data
export async function saveAnalytics(key, data) {
  await db.analytics.put({ key, data });
}

// Example: Get analytics data
export async function getAnalytics(key) {
  return db.analytics.get(key);
}

// Example: Save upcoming visits list
export async function saveUpcomingList(key, data) {
  await db.upcoming.put({ key, data });
}

// Example: Get upcoming visits list
export async function getUpcomingList(key) {
  return db.upcoming.get(key);
}

// Get the most recent cached logged-in user
export async function getCachedUser() {
  const drafts = await db.drafts.where('type').equals('loggedInUser').toArray();
  if (drafts && drafts.length > 0) {
    // Return the most recently updated user
    return drafts.reduce((a, b) => new Date(a.updatedAt) > new Date(b.updatedAt) ? a : b).data;
  }
  return null;
}
