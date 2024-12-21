import { Test, TestingModule } from '@nestjs/testing';
import { FilmsMongoDBRepository } from './filmsMongoDB.repository';

describe('FilmsRepositoryMongoDB', () => {
  let provider: FilmsMongoDBRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsMongoDBRepository],
    }).compile();

    provider = module.get<FilmsMongoDBRepository>(FilmsMongoDBRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
