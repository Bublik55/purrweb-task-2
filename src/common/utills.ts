import { ExecutionContext } from "@nestjs/common";

/*
	return source ID and user ID from context
*/
const UserEntityIds = (context: ExecutionContext) => {
  const [req] = context.getArgs();
  return {
    entityID: req.params.id,
    userID: req.user.id,
  };
};

const UserDtoIds = (context: ExecutionContext) => {
  const [req] = context.getArgs();
  return {
    userDtoId: req.body.authorId,
    authorId: req.user.id,
  };
};

export { UserEntityIds, UserDtoIds };
