angular.module('storyboardModule').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/addNewColumn.html',
    "<div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"cancel()\" aria-hidden=\"true\">&times;</button>\n" +
    "    <h4 class=\"modal-title\" id=\"addColumnLabel\">Add New Column</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <form class=\"form-horizontal\" role=\"form\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <label class=\"control-label col-sm-3\" for=\"columnName\">Name</label>\n" +
    "            <div class=\"col-sm-9\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"columnName\" ng-model=\"newColumn.name\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"add()\">Add</button>\n" +
    "</div>"
  );


  $templateCache.put('views/addNewStory.html',
    "<div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"cancel()\" aria-hidden=\"true\">&times;</button>\n" +
    "    <h4 class=\"modal-title\" id=\"addStoryLabel\">Add New Story</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <form class=\"form-horizontal\" role=\"form\">\n" +
    "        <div class=\"form-group\">\n" +
    "            <label class=\"control-label col-sm-3\" for=\"storySummary\">Summary</label>\n" +
    "            <div class=\"col-sm-9\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"storySummary\" ng-model=\"newStory.summary\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <label class=\"control-label col-sm-3\" for=\"storyEstimate\">Estimate</label>\n" +
    "            <div class=\"col-sm-9\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"storyEstimate\" ng-model=\"newStory.estimate\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group\">\n" +
    "            <label class=\"control-label col-sm-3\" for=\"storyDescription\">Description</label>\n" +
    "            <div class=\"col-sm-9\">\n" +
    "                <textarea class=\"form-control\" id=\"storyDescription\" ng-model=\"newStory.description\" rows=\"6\"></textarea>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"add()\">Add</button>\n" +
    "</div>"
  );


  $templateCache.put('views/addNewStoryboard.html',
    "<div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"cancel()\" aria-hidden=\"true\">&times;</button>\n" +
    "    <h4 class=\"modal-title\">Add New Storyboard</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <form class=\"form-horizontal\" role=\"form\" name=\"AddStoryboardForm\">\n" +
    "        <div class=\"form-group\" ng-class=\"{ 'has-error' : AddStoryboardForm.storyboardName.$invalid }\">\n" +
    "            <label class=\"control-label col-sm-3\" for=\"storyboardName\">Name</label>\n" +
    "            <div class=\"col-sm-9\">\n" +
    "                <input type=\"text\" class=\"form-control\" id=\"storyboardName\" name=\"storyboardName\" ng-model=\"newStoryboard.name\" required />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"add()\">Add</button>\n" +
    "</div>"
  );


  $templateCache.put('views/board.html',
    "<div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-{{columnWidth}}\" ng-repeat=\"(columnKey, column) in columns\">\n" +
    "            <p ng-model=\"column.name\"><strong>{{column.name}}</strong> <small ng-click=\"deleteColumn(columnKey)\"><a href=\"\" class=\"glyphicon glyphicon-trash\"></a></small></p>\n" +
    "            <div ui-sortable=\"sortableOptions\" class=\"card_container\" ng-model=\"column.stories\">\n" +
    "                <div class=\"card\" ng-repeat=\"(storyKey, story) in column.stories | orderByPriority\" ng-mouseover=\"story.isCurrentFocus = true\" ng-mouseout=\"story.isCurrentFocus = false\">\n" +
    "                    <div class=\"bs-callout\" ng-class=\"{ 'bs-callout-warning' : story.isCurrentFocus }\" style=\"position:relative; overflow:hidden;\">\n" +
    "                        <div style=\"position:absolute; bottom:-32px; right:-8px; font-size:86px; opacity:0.05; font-family:Times New Roman, Times, serif\">{{story.estimate}}</div>\n" +
    "                        <button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-show=\"story.isCurrentFocus\" ng-click=\"deleteStory(columnKey, story.$id)\">&times;</button>\n" +
    "                        <strong>{{story.summary}}</strong>\n" +
    "                        <p><small><em>{{story.description}}</em></small></p>\n" +
    "                        <button class=\"btn btn-primary btn-xs\" ng-click=\"progressStory(columnKey, story.$id)\"><span class=\"glyphicon glyphicon-arrow-right\"></span></button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/boardSelector.html',
    "<select ng-model=\"selectedBoardName\" class=\"form-control input-sm\">\n" +
    "    <option ng-repeat=\"(key, board) in boards\" value=\"{{key}}\">{{board.name}}</option>\n" +
    "</select>"
  );


  $templateCache.put('views/boards.html',
    "<ul>\n" +
    "    <li ng-repeat=\"board in boards\"><a ng-href=\"#/boards/{{$index}}\">{{board.name}}</a></li>\n" +
    "</ul>\n" +
    "\n"
  );


  $templateCache.put('views/dashboard.html',
    "<p>This is the dashboard view.</p>\n"
  );


  $templateCache.put('views/release-notes.html',
    "<div class=\"container\">\n" +
    "    <h1>Release Notes</h1>\n" +
    "    <h2>Planned Features</h2>\n" +
    "    <h2>What's Available in 0.1 ALPHA</h2>\n" +
    "    <ul>\n" +
    "        <li>Login via Facebook.</li>\n" +
    "        <li>Ability to add storyboards.</li>\n" +
    "        <li>Ability to add and delete stories.</li>\n" +
    "        <li>Ability to add and delete columns.</li>\n" +
    "        <li>Drag and drop prioritisation of user stories.</li>\n" +
    "    </ul>\n" +
    "    <h3>Known Issues</h3>\n" +
    "    <ul>\n" +
    "        <li>Switching storyboards does not update stories and requires a reload.</li>\n" +
    "        <li>When adding a story, the new story is not automatically shown in the user interface.</li>\n" +
    "    </ul>\n" +
    "\n" +
    "</div>\n"
  );

}]);
