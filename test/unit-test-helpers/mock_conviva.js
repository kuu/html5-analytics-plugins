Conviva = {
  currentPlayerStateManager: null, //unit test helper
  currentClient: null, //unit test helper
  currentSystemFactory: null,
  currentContentMetadata: null,
  SystemInterface: function(){},
  SystemFactory: function()
  {
    Conviva.currentSystemFactory = this;
    this.release = function()
    {
      Conviva.currentSystemFactory = null;
    };
  },
  Client: function()
  {
    //unit test helpers
    Conviva.currentClient = this;
    this.adPlaying = false;
    this.adStartSessionId = -1;
    this.adEndSessionId = -1;
    this.adStream = null;
    this.adPlayer = null;
    this.adPosition = null;

    this.sessionId = 0;

    this.getPlayerStateManager = function()
    {
      return new Conviva.PlayerStateManager();
    };
    this.detachPlayer = function(){};
    this.releasePlayerStateManager = function(){};
    this.createSession = function(){
      return this.sessionId++;
    };
    this.attachPlayer = function(){};
    this.release = function()
    {
      this.sessionId = 0;
      Conviva.currentClient = null;
    };
    this.adStart = function(sessionId, adStream, adPlayer, adPosition)
    {
      if (Conviva.currentPlayerStateManager)
      {
        //Conviva SDK sets player state to not monitored on ad start
        Conviva.currentPlayerStateManager.currentPlayerState = Conviva.PlayerStateManager.PlayerState.NOT_MONITORED;
      }
      this.adStartSessionId = sessionId;
      this.adPlaying = true;
      this.adStream = adStream;
      this.adPlayer = adPlayer;
      this.adPosition = adPosition;
    };
    this.adEnd = function(sessionId)
    {
      if (Conviva.currentPlayerStateManager)
      {
        //Conviva SDK sets player state to stopped on ad end
        Conviva.currentPlayerStateManager.currentPlayerState = Conviva.PlayerStateManager.PlayerState.STOPPED;
      }
      this.adEndSessionId = sessionId;
      this.adPlaying = false;
    };
  },
  SystemSettings: function(){},
  ClientSettings: function(){},
  ContentMetadata: function()
  {
    Conviva.currentContentMetadata = this;
  },
  PlayerStateManager: function()
  {
    Conviva.currentPlayerStateManager = this;

    this.currentPlayerState = Conviva.PlayerStateManager.PlayerState.UNKONWN; //unit test helper

    this.setPlayerState = function(state)
    {
      this.currentPlayerState = state;
    };
  }
};

Conviva.PlayerStateManager.PlayerState = {
  PLAYING: "playing",
  PAUSED: "paused",
  STOPPED: "stopped",
  BUFFERING: "buffering",
  UNKONWN: "unknown",
  NOT_MONITORED: "notMonitored"
};

Conviva.SystemSettings.LogLevel = {
  DEBUG: 0,
  ERROR: 3,
  INFO: 1,
  NONE: 4,
  WARNING: 2
};

Conviva.ContentMetadata.StreamType = {
  UNKNOWN: "unknown",
  LIVE: "live",
  VOD: "vod"
};

Conviva.Client.NO_SESSION_KEY = -2;

Conviva.Client.AdPosition = {
  PREROLL: "preroll",
  MIDROLL: "midroll",
  POSTROLL: "postroll"
};

Conviva.Client.AdStream = {
  CONTENT: "content",
  SEPARATE: "separate"
};

Conviva.Client.AdPlayer = {
  CONTENT: "content",
  SEPARATE: "separate"
};