import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Button } from "@mui/material";

const shortenAddress = (address) => {
  const prefix = address.substring(0, 6);
  const suffix = address.substring(address.length - 4);
  return `${prefix}...${suffix}`;
};

export default function Profile() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  console.log(address ? shortenAddress(address) : "address");

  if (isConnected) return <div>Connected to {ensName ?? shortenAddress(address)}</div>;
  return <Button onClick={() => connect()}>Connect Wallet</Button>;
}
