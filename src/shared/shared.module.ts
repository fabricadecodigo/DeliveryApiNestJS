import { CryptService } from './services/crypt.service';
import { Module } from '@nestjs/common';

@Module({    
    providers: [CryptService],
    exports: [CryptService]
})
export class SharedModule {}
