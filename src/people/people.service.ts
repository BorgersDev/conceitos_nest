import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>
  ) {}
  async create(createPersonDto: CreatePersonDto) {
    try {
      const personData = {
        name: createPersonDto.name,
        passwordHash: createPersonDto.password,
        email: createPersonDto.email,
      }
      const newPerson = this.peopleRepository.create(personData);
      return await this.peopleRepository.save(newPerson);
    } catch (error) {
      if(error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.peopleRepository.find({
      order: {
        id: 'desc'
      }
    });
  }

  async findOne(id: number) {
    return await this.peopleRepository.findOneBy({ id});
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const personData = {
      passwordHash: updatePersonDto?.password,
      name: updatePersonDto?.name,
    }
    const person = await this.peopleRepository.preload({
      id,
      ...personData,
    })
    if(!person) {
      throw new ConflictException('Person not found');
    }
    return this.peopleRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.peopleRepository.findOneBy({ id });
    if(!person) {
      throw new ConflictException('Person not found');
    }
    return this.peopleRepository.remove(person);
  }
}
