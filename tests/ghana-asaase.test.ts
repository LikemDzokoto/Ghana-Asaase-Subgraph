import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { ChangedLandOwner } from "../generated/schema"
import { ChangedLandOwner as ChangedLandOwnerEvent } from "../generated/GhanaAsaase/GhanaAsaase"
import { handleChangedLandOwner } from "../src/ghana-asaase"
import { createChangedLandOwnerEvent } from "./ghana-asaase-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let landAddress = "Example string value"
    let oldOwner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newOwner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newChangedLandOwnerEvent = createChangedLandOwnerEvent(
      landAddress,
      oldOwner,
      newOwner
    )
    handleChangedLandOwner(newChangedLandOwnerEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ChangedLandOwner created and stored", () => {
    assert.entityCount("ChangedLandOwner", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ChangedLandOwner",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "landAddress",
      "Example string value"
    )
    assert.fieldEquals(
      "ChangedLandOwner",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "oldOwner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ChangedLandOwner",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newOwner",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
