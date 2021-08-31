import { Body, Controller, Post, Req } from '@nestjs/common';
import { TestDto } from './test.dto';

@Controller('test')
export class TestController {
  @Post()
  testReq(@Body() testDto :TestDto): void {
    console.log(testDto.arr, typeof testDto.arr[0]);
  }
}
