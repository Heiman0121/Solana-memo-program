import {
    clusterApiUrl,
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
    LAMPORTS_PER_SOL,
  } from "@solana/web3.js";
  
  
  /*** 
  pub fn build_memo(memo: &[u8], signer_pubkeys: &[&Pubkey]) -> Instruction {
    Instruction {
        program_id: id(),
        accounts: signer_pubkeys
            .iter()
            .map(|&pubkey| AccountMeta::new_readonly(*pubkey, true))
            .collect(),
        data: memo.to_vec(),
    }
}
  */
 ///////////////////////////////////////////////////////////////////////////////////////////////
 ////////////I used rust memo program as a reference and transfer to ReactJS version////////////
 ///@https://github.com/solana-labs/solana-program-library/blob/master/memo/program/src/lib.rs//
////////////////////////////////////////////////////////////////////////////////////////////////

  const Memo = async (connection, wallet) => {
    const instruction = new TransactionInstruction({

//I deploy it to the account created and export it to the file solana_memo_program.json
//command: solana deploy solana/solana-program-library/target/deploy/spl_memo.so solana_memo_program.json
//Then the result I get "programId":"Ad8xeU6CeEgtfdFGPZpHygux2jExZ6e9xVgihh8MuGk3"

        programId: new PublicKey("Ad8xeU6CeEgtfdFGPZpHygux2jExZ6e9xVgihh8MuGk3"),
        keys: [{
        pubkey: wallet.publicKey,
        }],
      data: Buffer.from("https://github.com/Heiman0121/Solana-memo-program.git"),
    });

        ///Get the Memo data///
    return await sendAndConfirmTransaction(
      connection,
      new Transaction().add(instruction),
      [wallet],
      {
        commitment: "confirmed",
      }
    )
  };

  (async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const wallet = Keypair.generate();
  
    let airdropTransaction = await connection.requestAirdrop(
      wallet.publicKey,
      LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(airdropTransaction);
    
    // TODO invoke memo program
    const Sig = await Memo(connection, wallet);
    console.log('Signiture: ', Sig );
  })();