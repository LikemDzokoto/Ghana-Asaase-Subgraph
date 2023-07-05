import {
  ChangedLandOwner as ChangedLandOwnerEvent,
  NewLandOwner as NewLandOwnerEvent
} from "../generated/GhanaAsaase/GhanaAsaase"
import { createChangedLandOwner, createLand, createNewLandOwner, getOrCreateUser, updateLandOwner } from "./helper"

export function handleChangedLandOwner(event: ChangedLandOwnerEvent): void {
 let newOwner = getOrCreateUser(event.params.newOwner);
 let land = updateLandOwner(event.params.landAddress, newOwner.id, event.block.timestamp);

 createChangedLandOwner(event);
}

export function handleNewLandOwner(event: NewLandOwnerEvent): void {
  let owner = getOrCreateUser(event.params.owner);
  let land = createLand(event.params.landAddress, owner.id, event.block.timestamp);

  createNewLandOwner(event);
}
