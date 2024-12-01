import { Test, TestingModule } from '@nestjs/testing';
import { FilmsRepository } from './films.repository';

describe('FilmsRepository', () => {
  let provider: FilmsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsRepository],
    }).compile();

    provider = module.get<FilmsRepository>(FilmsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
