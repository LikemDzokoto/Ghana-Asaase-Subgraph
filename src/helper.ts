import {
  ChangedLandOwner as ChangedLandOwnerEvent,
  NewLandOwner as NewLandOwnerEvent,
} from "../generated/GhanaAsaase/GhanaAsaase";
import {
  Land,
  User,
  ChangedLandOwner,
  NewLandOwner,
} from "../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function getOrCreateUser(userAddress: Address): User {
  let user = User.load(userAddress.toHexString());
  if (user == null) {
    user = new User(userAddress.toHexString());
    user.save();
  }
  return user;
}

export function createLand(
  landAddress: string,
  ownerId: string,
  timestamp: BigInt
): Land {
  let land = new Land(landAddress);
  land.owner = ownerId;
  land.lastModified = timestamp;
  land.save();
  return land;
}

export function updateLandOwner(
  landAddress: string,
  newOwnerId: string,
  timestamp: BigInt
): Land | null {
  let land = Land.load(landAddress);
  if (land) {
    let previousOwner = land.owner;
    land.owner = newOwnerId;
    land.previousOwner = previousOwner;
    land.lastModified = timestamp;
    land.save();
  }
  return land;
}

export function createChangedLandOwner(event: ChangedLandOwnerEvent): void {
  let entity = new ChangedLandOwner(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.land = event.params.landAddress;
  entity.oldOwner = event.params.oldOwner.toHexString();
  entity.newOwner = event.params.newOwner.toHexString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function createNewLandOwner(event: NewLandOwnerEvent): void {
  let entity = new NewLandOwner(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.land = event.params.landAddress;
  entity.owner = event.params.owner.toHexString();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
