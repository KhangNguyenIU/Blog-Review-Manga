import { IsString } from "class-validator";

export class GoogleTokenDto {

    @IsString()
    tokenId : string;
}