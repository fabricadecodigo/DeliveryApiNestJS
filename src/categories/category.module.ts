import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategorySchema } from './schemas/category.schema';
import { CategoriesService } from './shared/categories.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Category', schema: CategorySchema }
        ])
    ],
    controllers: [
        CategoriesController
    ],
    providers: [
        CategoriesService
    ],
})
export class CategoryModule {}
