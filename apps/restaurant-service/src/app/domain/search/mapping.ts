export const Mapping = {
  properties: {
    address: {
      type: "text",
      analyzer: "english",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    city: {
      type: "text",
      analyzer: "english",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    country: {
      type: "text",
      analyzer: "english",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    state: {
      type: "text",
      analyzer: "english",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    description: {
      type: "text",
      analyzer: "english",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 1024,
        },
        word_delimiter: {
          type: "text",
          analyzer: "word_delimiter",
        },
      },
    },
    email: {
      type: "text",
      analyzer: "english",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    id: {
      type: "keyword",
    },
    banner: {
      type: "text",
      analyzer: "english",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    name: {
      type: "text",
      analyzer: "english",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
        word_delimiter: {
          type: "text",
          analyzer: "word_delimiter",
        },
      },
    },
    menu: {
      type: "text",
      analyzer: "english",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
        word_delimiter: {
          type: "text",
          analyzer: "word_delimiter",
        },
      },
    },
    cuisine: {
      type: "text",
      analyzer: "english",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    contact_no: {
      type: "keyword",
    },
    url: {
      type: "text",
      analyzer: "english",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
  },
};

export const Settings = {
  analysis: {
    analyzer: {
      word_delimiter: {
        tokenizer: "keyword",
        filter: ["word_delimiter"],
      },
    },
  },
};
