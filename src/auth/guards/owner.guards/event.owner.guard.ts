import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "src/event/entities/event.entity";
import { Repository } from "typeorm";
import { UserEntityIds } from "../../../common/utills";
@Injectable()
export class EventGuard extends AuthGuard("jwt") {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {
    super(eventRepository);
  }

  async canActivate(context: ExecutionContext) {
    const userEntityIds = UserEntityIds(context);
    const event = await this.eventRepository.findOne(userEntityIds.entityID, {
      relations: ["author"],
    });
    if ((await event.author).id == userEntityIds.userID) {
      return true;
    } else throw new ForbiddenException("Forbidden operation for user");
  }
}
