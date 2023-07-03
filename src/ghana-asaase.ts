import {
  ChangedLandOwner as ChangedLandOwnerEvent,
  NewLandOwner as NewLandOwnerEvent
} from "../generated/GhanaAsaase/GhanaAsaase"
import { ChangedLandOwner, NewLandOwner } from "../generated/schema"

export function handleChangedLandOwner(event: ChangedLandOwnerEvent): void {
  let entity = new ChangedLandOwner(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.landAddress = event.params.landAddress
  entity.oldOwner = event.params.oldOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewLandOwner(event: NewLandOwnerEvent): void {
  let entity = new NewLandOwner(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.landAddress = event.params.landAddress
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
