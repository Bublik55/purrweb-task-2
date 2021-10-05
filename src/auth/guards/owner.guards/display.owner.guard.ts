import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Content } from "src/content/entities/content.entity";
import { Display } from "src/display/entities/display.entity";
import { Event } from "src/event/entities/event.entity";
import { Repository } from "typeorm";
import { UserEntityIds } from "../../../common/utills";
@Injectable()
export class DisplayOwnerGuard extends AuthGuard("jwt") {
  constructor(
    @InjectRepository(Display)
    private displayRepository: Repository<Display>
  ) {
    super(displayRepository);
  }

  async canActivate(context: ExecutionContext) {
    const userEntityIds = UserEntityIds(context);
    const display = await this.displayRepository.findOne(
      userEntityIds.entityID,
      {
        relations: ["author"],
      }
    );
    if ((await display.author).id == userEntityIds.userID) {
      return true;
    } else throw new ForbiddenException("Forbidden operation for user");
  }
}
