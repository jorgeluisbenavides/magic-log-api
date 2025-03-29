import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PurchasesService } from '../services/purchases.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestProductIdsDto } from '../dto/RequestProductIdsDto';

@Controller('api/purchases')
export class PurchasesController {

  constructor(private purchaseService: PurchasesService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() body: RequestProductIdsDto) {
    
    return this.purchaseService.create(req.user, body);
  }
}
