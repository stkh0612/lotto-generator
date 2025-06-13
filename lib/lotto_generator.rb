class LottoGenerator
  DEFAULT_COUNT = 6
  DEFAULT_RANGE = (1..45)

  def initialize(count: DEFAULT_COUNT, range: DEFAULT_RANGE, seed: nil)
    @count = count
    @range = range
    @rng = seed ? Random.new(seed) : Random.new
  end

  def generate
    raise ArgumentError, 'count is larger than range size' if @count > @range.size
    @range.to_a.sample(@count, random: @rng).sort
  end
end
