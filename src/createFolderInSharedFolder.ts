// createFolderInShared.ts
import { getGraphClient } from "./graphClient";

/**
 * Creates a folder inside a OneDrive folder shared with the signed-in user.
 * The folder must already be shared and visible in "Shared with me".
 */
export const createFolderInSharedFolder = async (
  sharedFolderName: string,
  newFolderName: string
) => {
  const client = await getGraphClient();

  // 1. Fetch sharedWithMe items
  const response = await client.api("/me/drive/sharedWithMe").get();
  const sharedItem = response.value.find((item: any) => item.name === sharedFolderName);

  if (!sharedItem) throw new Error(`Shared folder "${sharedFolderName}" not found.`);

  const parentDriveId = sharedItem.remoteItem.parentReference.driveId;
  const parentItemId = sharedItem.remoteItem.id;

  // 2. Create a new folder inside the shared folder
  const newFolder = await client
    .api(`/drives/${parentDriveId}/items/${parentItemId}/children`)
    .post({
      name: newFolderName,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename",
    });

  return newFolder;
};
