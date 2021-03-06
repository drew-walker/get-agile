'use strict';

angular.module('getAgileApp')
    .factory('BoardService', function (firebaseRef, syncData, ColumnService, $q, $filter, IndexService) {
        var boardsReference = firebaseRef('boards');
        var defaultColumns = ColumnService.getDefaultColumns();
        return {
            getBoards: function() {
                return syncData('boards');
            },
            getBoardIdFromSlug: function(slug) {
                var deferred = $q.defer();
                var data = firebaseRef('boards');
                var idFound = false;
                data.on('child_added', function(snapshot) {
                    if (snapshot.val().slug === slug) {
                        idFound = true;
                        deferred.resolve(snapshot.name());
                    }
                });
//                data.on('loaded', function() {
//                    if (!idFound) deferred.
//                });
                return deferred.promise;
            },
            addBoard: function(board) {
                var deferred = $q.defer();
                var newBoard = boardsReference.push();
                newBoard.set(board, function() {
                    var boardId = newBoard.name();
                    deferred.resolve({ 'boardId' : boardId, 'slug' : board.slug });
                    ColumnService.addColumns(boardId, defaultColumns);
                });
                return deferred.promise;
            },
            getFirstBoard: function() {
                return syncData('boards', 1);
            },
            deleteBoard: function(boardId) {
                syncData('boards/' + boardId).$remove();
                ColumnService.deleteColumns(boardId);
            },
            archiveBoard: function(boardId) {
                syncData('boards/' + boardId + '/archived').$set(1);
            },
            addUserToBoard: function(boardId, userId) {
                IndexService.addUserToIndexForBoardTeam(boardId, userId);
                IndexService.addBoardToIndexForUser(boardId, userId);
            },
            removeUserFromBoard: function(boardId, userId) {
                IndexService.removeUserFromIndexForBoardTeam(boardId, userId);
                IndexService.removeBoardFromIndexForUser(boardId, userId);
            }
        };
    });
