import { Test, TestingModule } from '@nestjs/testing';
import { FilmsPostgreSQLRepository } from './filmsPostgreSQL.repository';

describe('FilmsPostgreSqlRepository', () => {
  let provider: FilmsPostgreSQLRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsPostgreSQLRepository],
    }).compile();

    provider = module.get<FilmsPostgreSQLRepository>(FilmsPostgreSQLRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
