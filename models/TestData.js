import { BaseModel } from "@try-catch-80/pgres";
import connection from "../config/connection";

class TestData extends BaseModel {
  constructor({
    name='',
    description=''
  } = {}) {
    const model = {
      name, description
    }

    super({ table: 'test_data', data: model, connection })
  }
}

export default TestData;
