import React, { useState } from 'react';
import { Box, Flex, Modal, Button, Text, Card, Radio, Field, Loader } from "rimble-ui";
import App from '../../App';
import ABI from '../../ABI';

function ModalExample(props) {


    const [isOpen, setIsOpen] = useState(false);
    const [cid, changeCid] = useState(0);
    const [loading, isLoading] = useState(false);
  
    const closeModal = e => {
      e.preventDefault();
      setIsOpen(false);
    };
  
    const openModal = e => {
      e.preventDefault();
      setIsOpen(true);
    };

    const onRadioChange = (e) => {
        changeCid(e.target.value);
    }

    const vote = async (eid) => {
        isLoading(true);
        var app = new App();
        var mainInstance = await app.loadInstance();
        var web3 = await app.loadWeb3();
        var account = await web3.eth.getAccounts();
        var elections = await mainInstance.Elections(eid);
        var election = await new web3.eth.Contract(ABI, elections);
        try{
            await election.methods.vote(cid).send({from:account[0]});
        }catch(e) {
            isLoading(false);
        }
        isLoading(false);
    }

    var candid = [], candidVote = [];
    for(var i = 1; i < props.candidates.length; i++) {
        candid.push(
            <Radio 
                name = "candidate" 
                label={props.candidates[i][1]} 
                my={2} 
                value={props.candidates[i][0]}
                onChange={onRadioChange}
            />)
        candidVote.push(props.candidates[i][2]);
    }

    return (
      <Box className="App" p={0}>
        <Box>
          <Button onClick={openModal}>Vote</Button>
  
          <Modal isOpen={isOpen}>
            <Card width={"420px"} p={0}>
              <Button.Text
                icononly
                icon={"Close"}
                color={"moon-gray"}
                position={"absolute"}
                top={0}
                right={0}
                mt={3}
                mr={3}
                onClick={closeModal}
              />
  
              <Box p={4} mb={3}>
                <h3>{props.election.electionName}</h3>
                <Field label="Choose candidate from below">
                    {candid}
                </Field>
              </Box>
  
              <Flex
                px={4}
                py={3}
                borderTop={1}
                borderColor={"#E8E8E8"}
                justifyContent={"flex-end"}
              >
                {loading ? <Loader size = "40px" /> : <Button.Outline onClick = {() => {vote(props.election.electionID)}}>Vote</Button.Outline>}
              </Flex>
            </Card>
          </Modal>
        </Box>
      </Box>
    );
  }

  export default ModalExample;