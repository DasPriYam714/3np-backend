import { Controller, Get } from "@nestjs/common/decorators";

@Controller('in')
export class UserController{
    @Get()
    getUser(): string {
        return " User name";
      }

}