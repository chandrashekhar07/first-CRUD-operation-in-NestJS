import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {

    getallItems(){
        return "get all cars";
    }

}
