function GetPluginSettings()
{
  return {
    "name": "AirConsole",
    "id": "AirConsole",
    "version": "1.4.8.1",
    "description": "Extend your game with local multiplayer fun",
    "author": "N-Dream AG",
    "help url": "http://developers.airconsole.com",
    "dependency": "https://www.airconsole.com/api/airconsole-1.6.0.js",
    "category": "Web",             // Prefer to re-use existing categories, but you can set anything here
    "type": "object",              // either "world" (appears in layout and is drawn), else "object"
    "rotatable":  false,           // only used when "type" is "world".  Enables an angle property on the object.
    "flags": pf_singleglobal       // uncomment lines to enable flags...
          //  | pf_singleglobal    // exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
          //  | pf_texture         // object has a single texture (e.g. tiled background)
          //  | pf_position_aces   // compare/set/get x, y...
          //  | pf_size_aces       // compare/set/get width, height...
          //  | pf_angle_aces      // compare/set/get angle (recommended that "rotatable" be set to true)
          //  | pf_appearance_aces // compare/set/get visible, opacity...
          //  | pf_tiling          // adjusts image editor features to better suit tiled images (e.g. tiled background)
          //  | pf_animations      // enables the animations system.  See 'Sprite' for usage
          //  | pf_zorder_aces     // move to top, bottom, layer...
          //  | pf_nosize          // prevent resizing in the editor
          //  | pf_effects         // allow WebGL shader effects to be added
          //  | pf_predraw         // set for any plugin which draws and is not a sprite (i.e. does not simply draw
                                   // a single non-tiling image the size of the object) - required for effects to work properly
  };
};

// ==============================================
// CONDITION
// ==============================================
// Deprecated
// Receive onMessageKey
AddAnyTypeParam("Message Key", "Data of the message key AirConsole.MessageKey");
AddCmpParam("Is", "Compare message data key");
AddAnyTypeParam("Value", "Compare to this value");
AddCondition(0, cf_deprecated, "On specific message key", "Data", "On message key {0} is {2}", "Triggered when a message key is received from a device.", "OnMessageKey");

// Receive onMessageIs
AddAnyTypeParam("Value", "Compare to this value");
// AND DEVICE ID IS
AddAnyTypeParam("Object DeviceID", "The object associated to this device id");
AddCondition(1, cf_trigger, "On specific message", "Data", "On message is {0} and from {1}", "Triggered when a specific message is received from a specific device.", "OnMessageIs");

// On Join
AddCondition(2, cf_trigger, "On device join", "Signalling", "On device join", "Triggered when device joins the game.", "OnDeviceJoin");

// On Leave
AddAnyTypeParam("DeviceID", "The device id which leaves");
AddCondition(3, cf_trigger, "On device left", "Signalling", "On device {0} disconnects", "Triggered when device leaves the game.", "OnDeviceLeft");

// Receive on device state
AddAnyTypeParam("DeviceID", "The device id to check the custom state");
AddAnyTypeParam("Key", "The key of the custom state data");
AddAnyTypeParam("Value", "Is equal this value");
AddCondition(4, cf_trigger, "On check device custom state", "Data", "Custom state {1} of device {0} is {2}", "Triggered when custom state data of a device matches a value.", "OnGetCustomDeviceState");

// Receive onMessage
AddCondition(5, cf_trigger, "On message", "Data", "On message from any controller", "Triggered when any message is received from any device", "OnMessage");

// Receive onMessageFrom
AddAnyTypeParam("DeviceID", "The device id sending the message");
AddCondition(6, cf_trigger, "On message from", "Data", "On message from {0}", "Triggered when any message is received from a specific device.", "OnMessageFrom");

// On any leave
AddCondition(7, cf_trigger, "On any device left", "Signalling", "On any device disconnects", "Triggered when a device leaves the game.", "OnAnyDeviceLeft");

// Receive Highscores
AddCondition(8, cf_trigger, "On receiving highscores", "Highscores", "On receiving highscores", "Triggered when highscores received.", "OnHighScores");

// Highscores stored
AddCondition(9, cf_trigger, "On highscores stored", "Highscores", "On highscores stored", "Triggered when highscores storing is done.", "OnHighScoreStored");

// On too many players
AddCondition(10, cf_trigger, "On too many players", "Signalling", "On too many players", "Triggered when max players is exceeded.", "OnTooManyPlayers");

// Is user logged in
AddNumberParam("DeviceID", "The device id you want to check if logged in");
AddCondition(11, 0, "Is user logged in", "Device and user", "Is device id {0} user logged in", "True if the device's user is logged in, false otherwise.", "IsUserLoggedIn");

AddCondition(12, cf_trigger, "On ad complete", "Ads", "On ad complete", "Triggered when an advertisement is finished or no advertisement was shown.", "OnAdComplete");
AddCondition(13, cf_trigger, "On premium", "Ads", "On premium", "Triggered when a device becomes premium or when a premium device connects.", "OnPremium");

AddCondition(14, cf_trigger, "On message key", "Data", "On any message key other than 'message'", "Triggered when a message key other than 'message' is received from any device.", "OnNewMessageKey");

AddAnyTypeParam("Key name", "The only key name you are awaiting");
AddCondition(15, cf_trigger, "On message key is", "Data", "On message key is {0}", "Triggered when a specific message key is received from any device. Triggers if only one key is received", "OnNewMessageKeyIs");

AddAnyTypeParam("Key name", "The key name you are awaiting");
AddCondition(16, cf_trigger, "On message keys contain", "Data", "On message keys contain {0}", "Triggered when a specific message key is received from any device.", "OnNewMessageKeyContains");

AddCondition(17, cf_trigger, "On persistent data loaded", "Persistent data", "On persistent data loaded", "Gets called when persistent data was loaded from requestPersistentData().", "OnPersistentDataLoaded");
AddCondition(18, cf_trigger, "On persistent data stored", "Persistent data", "On persistent data stored", "Gets called when persistent data was stored from storePersistentData().", "OnPersistentDataStored");

// ==============================================
// ACTION
// ==============================================
// Message
AddAnyTypeParam("Device ID", "The device id to send the data");
AddAnyTypeParam("Data", "The data to send to the device");
AddAction(1, af_none, "Send data", "Data", "Send data <i>{1}</i> to {0}", "Send data to the device.", "Message");

// Broadcast
AddAnyTypeParam("Data", "The data to send to all device.");
AddAction(2, af_none, "Broadcast data", "Data", "Broadcast data <i>{0}</i>", "Send a message to all devices", "Broadcast");

// Game ready
AddAction(3, af_none, "Game ready", "Data", "Broadcast game is ready", "Send a message to all devices that game is ready and devices can connect", "GameReady");

// Set setCustomDeviceState
AddAnyTypeParam("Key", "The device state key");
AddAnyTypeParam("Value", "The device state value");
AddAction(4, af_none, "Set custom device state (key and value)", "Data", "Set custom data <i>{0}</i> to <i>{1}</i>", "Sets the screen custom data", "SetCustomDeviceState");

AddStringParam("Level name", "The name of the level.");
AddStringParam("Level version", "The version of the level.", '"1.0"');
AddAnyTypeParam("UIDS", "An array of UIDs of the users should be included in the result. Default is all connected controllers.", '"all"');
AddStringParam("Ranks", "An array of high score rank types. High score rank types can include data from across the world, only a specific area or a users friends. Valid array entries are 'world', 'country', 'region', 'city', 'friends'. Use comma to separate the types if you need more than one.", '"world"');
AddNumberParam("Total", "Amount of high scores to return per rank type.", "8");
AddNumberParam("Top", "Amount of top high scores to return per rank type. top is part of total.", "5");
AddAction(5, af_none, "Request HighScores", "Highscores", "Request highscores", "Requests highscores. OnHighScores triggered when the highscores are returned.", "RequestHighScores");

AddStringParam("Level name", "	The name of the level the user was playing. This should be a human readable string because it appears in the high score sharing image. You can also just pass an empty string.");
AddStringParam("Level version", "The version of the level the user was playing. This is for your internal use.", '"1.0"');
AddNumberParam("Score", "The score the user has achieved.");
AddStringParam("Uid", "The UIDs of the users that achieved the high score. Can be a single uid or an array of uids. Default is the uid of this device. Use comma to separate multiple UIDS.");
AddStringParam("Data", "Custom high score data (e.g. can be used to implement Ghost modes or include data to verify that it is not a fake high score).", "");
AddStringParam("Score string", "A short human readable representation of the score. (e.g. '4 points in 3s'). Defaults to 'X points' where x is the score converted to an integer.", "");
AddAction(6, af_none, "Store HighScores", "Highscores", "Store highscores", "Stores highscores. OnHighScoreStored triggered when the request is completed.", "StoreHighScores");

AddNumberParam("Max player", "The maximum number of controllers that should get a player number assigned.");
AddAction(7, af_none, "Set active players", "System", "Set active players", "Takes all currently connected controllers and assigns them a player number. Can only be called by the screen. The assigned player numbers always start with 0 and are consecutive. You can hardcode player numbers, but not device_ids. Once the screen has called setActivePlayers you can get the device_id of the first player by calling convertPlayerNumberToDeviceId(0), the device_id of the second player by using ConvertPlayerNumberToDeviceId(1). You can also convert device_ids to player numbers by using ConvertDeviceIdToPlayerNumber(device_id). You can get all device_ids that are active players by using GetActivePlayerDeviceIds().", "SetActivePlayers");

AddAction(8, af_none, "Show ad", "Ads", "Show ad on controllers and screen", "Show ad on every connected controller and screen. onAdComplete is called when showing ad is over", "ShowAd");

AddAction(9, af_none, "Navigate home", "Browser", "Navigate home", "Request that all devices return to the AirConsole store.", "NavigateHome");

AddStringParam("url", "The base url of the game to navigate to (excluding screen.html or controller.html).", '""');
AddAction(10, af_none, "Navigate to", "Browser", "Navigate to {0}", "Request that all devices load a game by url.", "NavigateTo");

AddStringParam("uids", "A comma separated list of the uids for which you would like to request the persistent data. Leave empty to set as default to this device", '""');
AddAction(11, af_none, "Request persistent data", "Persistent data", "Request persistent data for {0}", "Requests persistent data from the servers.", "RequestPersistentData");

AddStringParam("key", "The key of the data entry.", '""');
AddStringParam("value", "The value of the data entry.", '""');
AddStringParam("uid", "The uid for which the data should be stored. Default is the uid of this device.", '""');
AddAction(12, af_none, "Store persistent data", "Persistent data", "Store persistent data {0} = {1} for uid {2}", "Stores a key-value pair persistently on the AirConsole servers. Storage is per game. Total storage can not exceed 1 MB per game and uid. Storage is public, not secure and anyone can request and tamper with it. Do not store sensitive data.", "StorePersistentData");

// ==============================================
// EXPRESSIONS
// ==============================================
AddExpression(1, ef_return_string, "Data", "Data", "Message", "The message received in a message trigger.");
AddExpression(2, ef_deprecated, "Data", "Data", "MessageKey", "The message key received in a message trigger.");
AddExpression(3, ef_return_number, "IDs", "IDs", "DeviceID", "The ID of the device the message is from in a message trigger.");
AddExpression(4, ef_return_number, "IDs", "IDs", "DeviceIDJoin", "The ID of the device which joined in OnDeviceJoin event.");
AddExpression(5, ef_return_number, "IDs", "IDs", "DeviceIDLeft", "The ID of the device which left in OnDeviceLeft event.");
AddExpression(6, ef_return_string, "Profile", "Profile", "NicknameJoin", "The nickname of the device which joined in OnDeviceJoin event.");
AddExpression(7, ef_return_string, "Profile", "Profile", "Nickname", "The nickname of the device the message is from in a message trigger.");
AddExpression(8, ef_return_string, "Profile", "Profile", "ProfilePicture", "The profile picture of the device the message is from in a message trigger.");
AddExpression(9, ef_return_string, "Profile", "Profile", "ProfilePictureJoin", "The profile picture of the device which joined in OnDeviceJoin event.");
AddExpression(10, ef_return_string, "Data", "Data", "DeviceUID", "The UID of the device that joined in OnDeviceJoin event.");
AddExpression(11, ef_return_string, "IDs", "IDs", "ControllerDeviceIDs", "A JSON converted array of all connected devices that have loaded your game.");
AddExpression(12, ef_return_number, "IDs", "IDs", "MasterControllerDeviceID", "Device ID of the master controller.");

AddNumberParam("PlayerNumber", "Player number");
AddExpression(13, ef_return_number, "Functions", "Functions", "ConvertPlayerNumberToDeviceId", "Returns the device_id of a player, if the player is part of the active players previously set by the screen by using  Set Active Players.");

AddNumberParam("DeviceId", "Device Id");
AddExpression(14, ef_return_number, "Functions", "Functions", "ConvertDeviceIdToPlayerNumber", "Returns the player number for a device_id, if the device_id is part of the active players previously set by the screen by using Set Active Players.");

AddExpression(15, ef_return_number, "Premium", "Premium", "IsPremiumJoin", "Returns 1 if the device which joined in onDeviceJoin is premium else 0.");
AddExpression(16, ef_return_number, "Premium", "Premium", "IsPremiumMessage", "Returns 1 if the device is premium in a message trigger else 0.");

AddNumberParam("DeviceId", "Device Id");
AddExpression(17, ef_return_number, "Premium", "Premium", "IsPremium", "Returns 1 if the device is premium else 0.");

AddExpression(18, ef_return_string, "Message properties", "Message properties", "GetMessageProperties", "Returns a recursive C2 dictionary of the keys with values sent in the last message.");

AddStringParam("Property name", "Property name");
AddExpression(19, ef_return_string, "Message properties", "Message properties", "GetMessageProperty", "Returns the value of the specified key sent in the last message.");

AddExpression(20, ef_return_number, "Message properties", "Message properties", "GetMessagePropertiesCount", "Returns how many keys were declared in the last message.");

AddStringParam("Property name", "Property name");
AddExpression(21, ef_return_number, "Message properties", "Message properties", "IsMessagePropertySet", "Returns 1 if the specified key was declared in the last message.");

AddExpression(22, ef_return_string, "Persistent data", "Persistent data", "PersistentData", "Returns a JSON string representation of the persistent data loaded by the last requestPersistentData.");

AddExpression(23, ef_return_string, "Highscores data", "Highscores", "Highscores", "Returns a JSON string representation of the highscores loaded by the last requestHighScores.");

AddNumberParam("DeviceId", "Device Id");
AddExpression(24, ef_return_string, "Functions", "Functions", "GetUID", "Returns the globally unique id of a device.");

AddNumberParam("DeviceId", "Device Id");
AddExpression(25, ef_return_string, "Functions", "Functions", "GetNickname", "Returns the nickname of a device.");

AddNumberParam("DeviceId", "Device Id");
AddExpression(26, ef_return_string, "Functions", "Functions", "GetProfilePicture", "Returns the profile picture of a device.");

////////////////////////////////////////
ACESDone();
////////////////////////////////////////

var property_list = [
  new cr.Property(ept_integer,  "Max players", 2, "Define the maximum amount of players")
];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
  return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
  assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
  return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
  assert2(this instanceof arguments.callee, "Constructor called as a function");

  // Save the constructor parameters
  this.instance = instance;
  this.type = type;

  // Set the default property values from the property table
  this.properties = {};

  for (var i = 0; i < property_list.length; i++)
    this.properties[property_list[i].name] = property_list[i].initial_value;

  // Plugin-specific variables
  // this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}
