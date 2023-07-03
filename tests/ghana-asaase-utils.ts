import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  ChangedLandOwner,
  NewLandOwner
} from "../generated/GhanaAsaase/GhanaAsaase"

export function createChangedLandOwnerEvent(
  landAddress: string,
  oldOwner: Address,
  newOwner: Address
): ChangedLandOwner {
  let changedLandOwnerEvent = changetype<ChangedLandOwner>(newMockEvent())

  changedLandOwnerEvent.parameters = new Array()

  changedLandOwnerEvent.parameters.push(
    new ethereum.EventParam(
      "landAddress",
      ethereum.Value.fromString(landAddress)
    )
  )
  changedLandOwnerEvent.parameters.push(
    new ethereum.EventParam("oldOwner", ethereum.Value.fromAddress(oldOwner))
  )
  changedLandOwnerEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return changedLandOwnerEvent
}

export function createNewLandOwnerEvent(
  landAddress: string,
  owner: Address
): NewLandOwner {
  let newLandOwnerEvent = changetype<NewLandOwner>(newMockEvent())

  newLandOwnerEvent.parameters = new Array()

  newLandOwnerEvent.parameters.push(
    new ethereum.EventParam(
      "landAddress",
      ethereum.Value.fromString(landAddress)
    )
  )
  newLandOwnerEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return newLandOwnerEvent
}
