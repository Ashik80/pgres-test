import TestData from "../../../models/TestData";

const handler = async (req, res) => {
  const id = req.query.id;
  
  const testDataModel = new TestData();
  
  let testData;

  try {
    testData = await testDataModel.findById(id);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }

  if (req.method === 'GET') return res.json(testData);

  testData.name = req.body.name || testData.name;
  testData.description = req.body.description || testData.description;

  try {
    await testDataModel.update(testData);

    return res.json({ message: 'Product updated' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export default handler;
