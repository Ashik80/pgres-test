import TestData from "../../../models/TestData";

const handler = async (_, res) => {
  try {
    const testDataModel = new TestData();
    const testDatas = await testDataModel.list();
    return res.json(testDatas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default handler;
