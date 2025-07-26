module LottoI18n
  MESSAGES = {
    "count_too_large" => {
      "en" => "count is larger than range size",
      "ja" => "範囲のサイズより多く選択されています"
    }
  }

  def self.message(key, lang)
    lang ||= "en"
    translations = MESSAGES[key] || {}
    translations[lang] || translations["en"]
  end
end
