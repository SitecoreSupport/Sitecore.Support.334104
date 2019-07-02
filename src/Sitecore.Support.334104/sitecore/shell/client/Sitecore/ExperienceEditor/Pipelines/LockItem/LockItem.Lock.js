define
  (
    [
      "sitecore",
      "/-/speak/v1/ExperienceEditor/ExperienceEditor.js",
    ], function (Sitecore, ExperienceEditor) {
        return ExperienceEditor.PipelinesUtil.generateRequestProcessor("ExperienceEditor.LockItem", function (response) {
    /*fix bug 334104 - always force page reload on item Lock
    if (response.context.currentContext.version != response.responseValue.value.Version) {
        ExperienceEditor.refreshOnItem(response.context.currentContext, true);
        }
    */
     ExperienceEditor.refreshOnItem(response.context.currentContext, true);

    var locked = response.responseValue.value.Locked;
    ExperienceEditor.getPageEditingWindow().Sitecore.PageModes.ChromeManager.updateItemRevision(response.context.currentContext.itemId, response.responseValue.value.Revision);

    Sitecore.Commands.Lock.setButtonTitle(response.context, locked);
    response.context.app.currentContext.isLocked = locked;
    if (locked) {
      response.context.app.currentContext.isLockedByCurrentUser = true;
    }
  });
});