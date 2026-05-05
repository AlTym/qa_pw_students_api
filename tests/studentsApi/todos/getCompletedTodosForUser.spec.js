import { tr } from '@faker-js/faker';
import { test } from '../../_fixtures/fixtures';

/*
Preconditions:
1. Send GET request to '/todos' endpoint
2. Assert that the Success Response Code is received
3. Find the entry in the Repsonse Body where "completed" equals "true"
4. Save the userId of this "todo" entry
*/

let good;

test.beforeEach(async ({todosAPI}) => {
  const response = await todosAPI.getAllTodos();

  await todosAPI.assertSuccessResponseCode(response);

  const body = await todosAPI.parseBody(response);

  good = body.find(todo => todo.completed === true);
});

test('GET completed todos by existing userId', async ({todosAPI}) => {
  const userId = good.userId;
  const status = true;
  const response = await todosAPI.getCompletedTodosById(userId);

  await todosAPI.assertSuccessResponseCode(response);
  await todosAPI.assertUserIdIsCorrect(response, userId);
  await todosAPI.assertStatusIsCorrect(response, status);
});
