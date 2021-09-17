import { ExecutionContext } from '@nestjs/common';

/*
	return source ID and user ID from context
*/
const UserEntityIds = (context: ExecutionContext) => {
  const [req] = context.getArgs();

  return {
    entityID: req.params.id || req.params.userid,
    userID: req.user.id,
  };
};

export { UserEntityIds };
