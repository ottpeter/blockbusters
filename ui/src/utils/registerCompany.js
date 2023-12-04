export async function registerCompany(companyId, details) {
  try {
    // async smart contract call
    console.log("companyId: ", companyId);
    console.log("details: ", details);

    return true;
  } catch (error) {
    console.error("There was an error while trying to register company: ", error);
  }
}
