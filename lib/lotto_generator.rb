require_relative 'lotto_i18n'

class LottoGenerator
  DEFAULT_COUNT = 6
  DEFAULT_RANGE = (1..45)

  def initialize(count: DEFAULT_COUNT, range: DEFAULT_RANGE, seed: nil, language: 'en')
    @count = count
    @range = range
    @rng = seed ? Random.new(seed) : Random.new
    @language = language
  end

  def generate
    if @count > @range.size
      message = LottoI18n.message('count_too_large', @language)
      raise ArgumentError, message
    end
    @range.to_a.sample(@count, random: @rng).sort
  end
end
