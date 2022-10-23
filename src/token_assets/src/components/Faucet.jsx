import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
  const [isDisabled, setDisable] = useState(false);
  const [btnText, setBtnText] = useState("Gimme gimme");

  async function handleClick(event) {
    setDisable(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    /*
    Initially, canister is not authenticated and assigned with an arbitrary id e.g. '2vxsx-fae'.
    This step makes it a canister with the id of the authenticated client attached.
    */
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    // const result = await token.payOut();
    const result = await authenticatedCanister.payOut();
    setBtnText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free edoCoin tokens here! Claim 10,000 EDC coins to{" "}
        {props.userPrincipal}.
      </label>
      <p className="trade-buttons">
        <button disabled={isDisabled} id="btn-payout" onClick={handleClick}>
          {btnText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
