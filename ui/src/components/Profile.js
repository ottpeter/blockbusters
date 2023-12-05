import { useAccount, useBalance, useConnect, useEnsName } from "wagmi";
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

  const { data, isError, isLoading } = useBalance({
    address: '0xE970fd7835B6Aa2CBae1Ec30f6b3fa7FeE786E85',
  })

  console.log("Data: ", data?.formatted)

  console.log(address ? shortenAddress(address) : "address");

  if (isConnected) return <div>Connected to {ensName ?? shortenAddress(address)}</div>;
  return <Button onClick={() => connect()}>Connect Wallet</Button>;
}
