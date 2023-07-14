import * as React from 'react';
import { useContract } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { useMintToken } from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import backgroundImage from "./img/pepe100art.jpg";
import logoImage from "./img/logo.png";
import logoCircleImage from "./img/logo_circle.jpg"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar } from 'react-bootstrap';
import { HiChevronDoubleDown } from "react-icons/hi";
import { IconContext } from 'react-icons';
import { useBalance } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useEffect } from 'react';

export default function Home() {
  const contractAddress = "0x5DA2079951D8DB17bD1c2892AaDF74c5d388f6c7"
  const { contract } = useContract(contractAddress, "token");
  const address = useAddress();
  const { mutateAsync: mintToken, isLoading_, error } = useMintToken(contract);
  const [ethAmount, setEthAmount] = useState(0);
  const [pepe100Amount, setPepe100Amount] = useState(0);
  const pepe100EthRate = 0.01;// TODO
  const [balance, setBalance] = useState('');
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  //const [ethAmountValidated, setETHAmountValidated] = useState(true);
  //const [validateMessage, setValidateMessage] = useState('');

  const ethCalculator = (_pepe100Amount) => {
    let ethAmount_ = _pepe100Amount * pepe100EthRate;
    setEthAmount(ethAmount_);
  }

  const pepe100Calculator = (_ethAmount) => {
    let pepe100Amount_ = _ethAmount / pepe100EthRate;
    setPepe100Amount(pepe100Amount_);
  }

  //inputETH <= actual ETH balance
  /*const ethValidator = (_inputETH, _actualETHBalance) => {
    let result = _inputETH <= _actualETHBalance
    setETHAmountValidated(result);
    return result;
  }*/

  /*useEffect(() => {
    async function fetchBalance() {
      try {
        const value = data.displayValue;
        const dotIndex = value.indexOf(".");
        const balance = dotIndex !== -1 ? value.substring(0, dotIndex + 4) : value;
        setBalance(balance);
        console.log(balance);
      } catch (error) {
        console.log('Failed to fetch wallet balance', error);
      }
    }

    fetchBalance();
  }, [data]);*/

  //validation
  //error,success handling
  //update address
  //token drop仕様に書き換え。特にmintTokenのところ

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <img
              src={logoImage}
              width="120"
              height="60"
              className="d-inline-block align-top"
              alt="Pepe100 logo"
            />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text href="#home">
              What is Pepe100?
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="main" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Container className="main" style={{ flexDirection: "column" }}>
          <Row className="justify-content-center align-items-center" style={{ flex: "1 1 auto" }}>
            <Col md="auto">
              <img
                src={logoCircleImage}
                width="150"
                height="150"
                className="d-inline-block align-top"
                alt="Pepe100 Circle logo"
              />
            </Col>
            <Col>
            </Col>
          </Row>
          <Row className="justify-content-between" style={{ flex: "2 1 auto" }}>
            <Col md="auto">
              <div style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: "2rem", padding: "3rem" }}>
                <h1 className="title" style={{ textAlign: "center", color: '#333333' }}>
                  Get{""}  Pepe100
                </h1>
                <h4 style={{ textAlign: "center", color: '#333333' }}>1 Pepe100 = $0.00001</h4>

                <div class="header" style={{}}>
                  <>
                    <InputGroup size='lg' className="mb-3 mb-0" style={{ marginTop: "2rem", marginBottom: "0" }}>
                      <Form.Control
                        aria-describedby="basic-addon2"
                        value={ethAmount}
                        onChange={e => {
                          setEthAmount(e.target.value);
                          pepe100Calculator(e.target.value);
                        }}
                      />
                      <InputGroup.Text id="basic-addon2">ETH</InputGroup.Text>
                    </InputGroup>
                    <IconContext.Provider value={{ color: "#000000", size: "2rem" }}>
                      <div className='chevron'>
                        <HiChevronDoubleDown />
                      </div>
                    </IconContext.Provider>
                    <InputGroup size='lg' className="mb-3">
                      <Form.Control
                        aria-describedby="basic-addon2"
                        value={pepe100Amount}
                        onChange={e => {
                          setPepe100Amount(e.target.value);
                          ethCalculator(e.target.value);
                        }}
                      />
                      <InputGroup.Text id="basic-addon2">Pepe100</InputGroup.Text>
                    </InputGroup>
                  </>

                  <div style={{ textAlign: "center", margin: "2rem" }}>
                    <Web3Button
                      contractAddress={contractAddress}
                      className='web3-button'
                      action={() =>
                        mintToken({
                          amount: pepe100Amount,
                          to: address
                        })}
                      onSuccess={(result) => alert("Success!")}
                      onError={(error) => alert("Something went wrong!")}>
                      Mint
                    </Web3Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
