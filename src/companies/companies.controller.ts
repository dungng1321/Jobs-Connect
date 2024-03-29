import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ResponseMessage, RequestUser, Public } from 'src/decorator/customize';
import { IUser } from 'src/users/interface/user.interface';
import { MESSAGE_SUCCESS } from 'src/constants/constants.message';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post('create-new-company')
  @ResponseMessage(MESSAGE_SUCCESS.CREATE_NEW_COMPANY_SUCCESS)
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @RequestUser() user: IUser,
  ) {
    try {
      return this.companiesService.create(createCompanyDto, user);
    } catch (err) {
      throw new HttpException(err.message, err.statusCode);
    }
  }

  // get all companies with pagination and search
  @Public()
  @Get('/get-all-companies')
  @ResponseMessage(MESSAGE_SUCCESS.GET_COMPANIES_SUCCESS)
  findAll(
    @Query('current') currentPage: number,
    @Query('pageSize') limit: number,
    @Query() queryString: string,
  ) {
    try {
      return this.companiesService.findAll(currentPage, limit, queryString);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  // get company by id
  @Public()
  @Get('/get-company/:id')
  @ResponseMessage(MESSAGE_SUCCESS.GET_COMPANY_SUCCESS)
  findOne(@Param('id') id: string) {
    try {
      return this.companiesService.findOne(id);
    } catch (err) {
      throw new HttpException(err.message, err.statusCode);
    }
  }

  // update company by id
  @Patch('/update-company/:id')
  @ResponseMessage(MESSAGE_SUCCESS.UPDATE_COMPANY_SUCCESS)
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @RequestUser() user: IUser,
  ) {
    try {
      return this.companiesService.update(id, updateCompanyDto, user);
    } catch (err) {
      throw new HttpException(err.message, err.statusCode);
    }
  }

  @Delete('/delete-company/:id')
  @ResponseMessage(MESSAGE_SUCCESS.DELETE_COMPANY_SUCCESS)
  remove(@Param('id') id: string, @RequestUser() user: IUser) {
    try {
      return this.companiesService.remove(id, user);
    } catch (err) {
      throw new HttpException(err.message, err.statusCode);
    }
  }
}
