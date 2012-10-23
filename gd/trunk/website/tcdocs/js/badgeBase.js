/*
 * Copyright (C) 2012 TopCoder Inc., All Rights Reserved.
 */
/**
 * The base js for badges related logic.
 *
 * <p>
 * Version 1.0 (Release Assembly - TopCoder Software Profile Update) Change notes:
 * - Add some base logic for badges.
 * </p>
 *
 * @author TCSASSEMBLER
 * @version 1.0
 */

/**
 * The global badge info.
 */
var globalBadgeInfo = {
    categorizedBadgeNames: {
        'progress meters development': [
            {name: 'Forum Posts', auto: true, subBadges: [
                {name: 'Forum Posts: 1'},
                {name: 'Forum Posts: 100'},
                {name: 'Forum Posts: 500'},
                {name: 'Forum Posts: 1000'},
                {name: 'Forum Posts: 5000'}]
            },
            {name: 'Rated SRMs', auto: true, subBadges: [
                {name: 'Rated SRMs: 1'},
                {name: 'Rated SRMs: 5'},
                {name: 'Rated SRMs: 25'},
                {name: 'Rated SRMs: 100'},
                {name: 'Rated SRMs: 300'}]
            },
            {name: 'SRM Room Wins', auto: true, subBadges: [
                {name: 'SRM Room Wins: 1'},
                {name: 'SRM Room Wins: 5'},
                {name: 'SRM Room Wins: 20'},
                {name: 'SRM Room Wins: 50'},
                {name: 'SRM Room Wins: 100'}]
            },
            {name: 'Solved SRM Problems', auto: true, subBadges: [
                {name: 'Solved SRM Problems: 1'},
                {name: 'Solved SRM Problems: 10'},
                {name: 'Solved SRM Problems: 50'},
                {name: 'Solved SRM Problems: 200'},
                {name: 'Solved SRM Problems: 500'}]
            },
            {name: 'Successful Challenges', auto: true, subBadges: [
                {name: 'Successful Challenges: 1'},
                {name: 'Successful Challenges: 5'},
                {name: 'Successful Challenges: 25'},
                {name: 'Successful Challenges: 100'},
                {name: 'Successful Challenges: 200'}]
            },
            {name: 'Marathon Matches', auto: true, subBadges: [
                {name: 'Marathon Matches: 1'},
                {name: 'Marathon Matches: 3'},
                {name: 'Marathon Matches: 10'},
                {name: 'Marathon Matches: 20'},
                {name: 'Marathon Matches: 50'}]
            },
            {name: 'Marathon Top-5 Placements', auto: true, subBadges: [
                {name: 'Marathon Top-5 Placements: 1'},
                {name: 'Marathon Top-5 Placements: 2'},
                {name: 'Marathon Top-5 Placements: 4'},
                {name: 'Marathon Top-5 Placements: 8'},
                {name: 'Marathon Top-5 Placements: 16'}]
            },
            {name: 'Passing Submissions', auto: true, subBadges:[
                {name: 'Passing Submissions: 1'},
                {name: 'Passing Submissions: 50'},
                {name: 'Passing Submissions: 100'},
                {name: 'Passing Submissions: 250'},
                {name: 'Passing Submissions: 500'}]
            },
            {name: 'Milestone Prizes', auto: true, subBadges: [
                {name: 'Milestone Prizes: 1'},
                {name: 'Milestone Prizes: 50'},
                {name: 'Milestone Prizes: 100'},
                {name: 'Milestone Prizes: 250'},
                {name: 'Milestone Prizes: 500'}]
            },
            {name: 'Winning Placements', auto: true, subBadges: [
                {name: 'Winning Placements: 1'},
                {name: 'Winning Placements: 25'},
                {name: 'Winning Placements: 50'},
                {name: 'Winning Placements: 100'},
                {name: 'Winning Placements: 250'}]
            },
            {name: 'First-Place Wins', auto: true, subBadges: [
                {name: 'First-Place Wins: 1'},
                {name: 'First-Place Wins: 25'},
                {name: 'First-Place Wins: 50'},
                {name: 'First-Place Wins: 100'},
                {name: 'First-Place Wins: 250'}]
            }],

        'progress meters studio': [
            {name: 'Forum Posts', auto: true, subBadges: [
                {name: 'Studio Forum Posts: 1'},
                {name: 'Studio Forum Posts: 100'},
                {name: 'Studio Forum Posts: 500'},
                {name: 'Studio Forum Posts: 1000'},
                {name: 'Studio Forum Posts: 5000'}]
            },
            {name: 'Passing Submissions', auto: true, subBadges:[
                {name: 'Studio Passing Submissions: 1'},
                {name: 'Studio Passing Submissions: 50'},
                {name: 'Studio Passing Submissions: 100'},
                {name: 'Studio Passing Submissions: 250'},
                {name: 'Studio Passing Submissions: 500'}]
            },
            {name: 'Milestone Prizes', auto: true, subBadges: [
                {name: 'Studio Milestone prizes: 1'},
                {name: 'Studio Milestone prizes: 50'},
                {name: 'Studio Milestone prizes: 100'},
                {name: 'Studio Milestone prizes: 250'},
                {name: 'Studio Milestone prizes: 500'}]
            },
            {name: 'Winning Placements', auto: true, subBadges: [
                {name: 'Studio Winning Placements: 1'},
                {name: 'Studio Winning Placements: 25'},
                {name: 'Studio Winning Placements: 50'},
                {name: 'Studio Winning Placements: 100'},
                {name: 'Studio Winning Placements: 250'}]
            },
            {name: 'First-Place Wins', auto: true, subBadges: [
                {name: 'Studio First-Place Wins: 1'},
                {name: 'Studio First-Place Wins: 25'},
                {name: 'Studio First-Place Wins: 50'},
                {name: 'Studio First-Place Wins: 100'},
                {name: 'Studio First-Place Wins: 250'}]
            }],

        'merit groups': [
            {name: 'UI and Graphic Design', auto: false, subBadges: [
                {name: 'Wireframe', auto: false},
                {name: 'Desktop App UI', auto: false},
                {name: 'Mobile UI', auto: false},
                {name: 'Web UI', auto: false},
                {name: 'Branding /Marketing /Presentation', auto: false}]
            },
            {name: 'Implementation', auto: false, subBadges: [
                {name: 'UI Development', auto: false},
                {name: 'Architecture and Design', auto: false},
                {name: 'Component Development', auto: false},
                {name: 'Assembly', auto: false}]
            },
            {name: 'Business Analysis', auto: false, subBadges: [
                {name: 'Idea Generation', auto: false},
                {name: 'Conceptualization', auto: false}]
            },
            {name: 'Testing and QA', auto: false, subBadges: [
                {name: 'Test Scenarios', auto: false},
                {name: 'Bug Hunts', auto: false}]
            },
            {name: 'Analytics', auto: false, subBadges: [
                {name: 'Big Data', auto: false}]
            }],
        'special': [
            {name: 'SRM Winner Div 1', auto: true},
            {name: 'SRM Winner Div 2', auto: true},
            {name: 'Marathon Match Winner', auto: true},
            {name: 'Algorithm Target', auto: true},
            {name: 'Marathon Target', auto: true},
            {name: 'Studio Cup top 5', auto: true},
            {name: 'TCO On-Site Competitor', auto: false},
            {name: 'TopCoder Event Trip Winner', auto: false},
            {name: 'Digital Run Top 5', auto: true},
            {name: 'TCO Finalist', auto: false},
            {name: 'TCCC On-Site Competitor', auto: false},
            {name: 'Studio Cup Winner', auto: true},
            {name: 'TCO Champion', auto: false},
            {name: 'TCCC Finalist', auto: false},
            {name: 'Digital Run Winner', auto: true},
            {name: 'Member of the Month', auto: false},
            {name: 'TCCC Champion', auto: false}],
        'skill': [
            {name: 'Marathon Copilot / Problem Writer', auto: false},
            {name: 'Algorithm Problem Writer', auto: false},
            {name: 'Solved Hard Div1 Problem in SRM', auto: true},
            {name: 'Solved Hard Div2 Problem in SRM', auto: true}],
        'reviewing': [
            {name: 'Studio Spec Reviewer', auto: false},
            {name: 'Studio Screener', auto: false},
            {name: 'TopCoder Reviewer', auto: false}],
        'community': [
            {name: 'Studio Spirit', auto: false},
            {name: 'Studio Mentor', auto: false},
            {name: 'TopCoder Spirit', auto: false},
            {name: 'TopCoder Mentor', auto: false}]
    },
    rowMaxSingle: 3,
    rowMaxGroup: 2,
    currentMember: {}
};

/**
 * Convert name to corresponding css name.
 *
 * @param name the name.
 * @return converted css name.
 */
function name2cssClass(name) {
    return name.split(/\W+/).join('-');
}

/**
 * The the id of the rule the badge corresponds to.
 * @param {} name the badge name
 * @return {Number} the rule ID.
 */
function getBadgeId(name) {
    for(var i=1; i<89; i++) {
        if(mapBadge(i.toString()) == name) {
            return i;
        }
    }
    return -1;
}

/**
 * This method maps the relationship between achievement rule id and it representation in UI.
 * @param {} id Achievement Rule ID.
 * @return {String} Representation of this rule in UI.
 */
function mapBadge(id) {
    switch(id) {
        case "1":
            return 'Forum Posts: 1';
        case "2":
            return 'Forum Posts: 100';
        case "3":
            return 'Forum Posts: 500';
        case "4":
            return 'Forum Posts: 1000';
        case "5":
            return 'Forum Posts: 5000';
        case "6":
            return 'Passing Submissions: 1';
        case "7":
            return 'Passing Submissions: 50';
        case "8":
            return 'Passing Submissions: 100';
        case "9":
            return 'Passing Submissions: 250';
        case "10":
            return 'Passing Submissions: 500';
        case "11":
            return 'Milestone Prizes: 1';
        case "12":
            return 'Milestone Prizes: 50';
        case "13":
            return 'Milestone Prizes: 100';
        case "14":
            return 'Milestone Prizes: 250';
        case "15":
            return 'Milestone Prizes: 500';
        case "16":
            return 'Winning Placements: 1';
        case "17":
            return 'Winning Placements: 25';
        case "18":
            return 'Winning Placements: 50';
        case "19":
            return 'Winning Placements: 100';
        case "20":
            return 'Winning Placements: 250';
        case "21":
            return 'First-Place Wins: 1';
        case "22":
            return 'First-Place Wins: 25';
        case "23":
            return 'First-Place Wins: 50';
        case "24":
            return 'First-Place Wins: 100';
        case "25":
            return 'First-Place Wins: 250';
        case "26":
            return 'Studio Forum Posts: 1';
        case "27":
            return 'Studio Forum Posts: 100';
        case "28":
            return 'Studio Forum Posts: 500';
        case "29":
            return 'Studio Forum Posts: 1000';
        case "30":
            return 'Studio Forum Posts: 5000';
        case "31":
            return 'Studio Passing Submissions: 1';
        case "32":
            return 'Studio Passing Submissions: 50';
        case "33":
            return 'Studio Passing Submissions: 100';
        case "34":
            return 'Studio Passing Submissions: 250';
        case "35":
            return 'Studio Passing Submissions: 500';
        case "36":
            return 'Studio Milestone Prizes: 1';
        case "37":
            return 'Studio Milestone Prizes: 50';
        case "38":
            return 'Studio Milestone Prizes: 100';
        case "39":
            return 'Studio Milestone Prizes: 250';
        case "40":
            return 'Studio Milestone Prizes: 500';
        case "41":
            return 'Studio Winning Placements: 1';
        case "42":
            return 'Studio Winning Placements: 25';
        case "43":
            return 'Studio Winning Placements: 50';
        case "44":
            return 'Studio Winning Placements: 100';
        case "45":
            return 'Studio Winning Placements: 250';
        case "46":
            return 'Studio First-Place Wins: 1';
        case "47":
            return 'Studio First-Place Wins: 25';
        case "48":
            return 'Studio First-Place Wins: 50';
        case "49":
            return 'Studio First-Place Wins: 100';
        case "50":
            return 'Studio First-Place Wins: 250';
        case "51":
            return 'Digital Run Winner';
        case "52":
            return 'Digital Run Top 5';
        case "53":
            return 'Studio Cup Winner';
        case "54":
            return 'Studio Cup Top 5';
        case "55":
            return 'Wireframe';
        case "56":
            return 'Desktop App UI';
        case "57":
            return 'Mobile UI';
        case "58":
            return 'Web UI';
        case "59":
            return 'Branding /Marketing /Presentation';
        case "60":
            return 'UI Development';
        case "61":
            return 'Architecture and Design';
        case "62":
            return 'Component Development';
        case "63":
            return 'Assembly';
        case "64":
            return 'Idea Generation';
        case "65":
            return 'Conceptualization';
        case "66":
            return 'Test Scenarios';
        case "67":
            return 'Bug Hunts';
        case "68":
            return 'Big Data';
        case "69":
            return 'TCO On-Site Competitor';
        case "70":
            return 'TCO Finalist';
        case "71":
            return 'TCO Champion';
        case "72":
            return 'Member of the Month';
        case "73":
            return 'TopCoder Event Trip Winner';
        case "74":
            return 'TCO On-Site Competitor';
        case "75":
            return 'TCO Finalist';
        case "76":
            return 'TCO Champion';
        case "77":
            return 'Member of the Month';
        case "78":
            return 'TopCoder Event Trip Winner';
        case "79":
            return 'TCCC On-Site Competitor';
        case "80":
            return 'TCCC Finalist';
        case "81":
            return 'TCCC Champion';
        case "82":
            return 'Studio Spec Reviewer';
        case "83":
            return 'Studio Screener';
        case "84":
            return 'TopCoder Reviewer';
        case "85":
            return 'Studio Spirit';
        case "86":
            return 'Studio Mentor';
        case "87":
            return 'TopCoder Spirit';
        case "88":
            return 'TopCoder Mentor';
        case "89":
            return 'Rated SRMs: 1';
        case "90":
            return 'Rated SRMs: 5';
        case "91":
            return 'Rated SRMs: 25';
        case "92":
            return 'Rated SRMs: 100';
        case "93":
            return 'Rated SRMs: 300';
        case "94":
            return 'SRM Room Wins: 1';
        case "95":
            return 'SRM Room Wins: 5';
        case "96":
            return 'SRM Room Wins: 20';
        case "97":
            return 'SRM Room Wins: 50';
        case "98":
            return 'SRM Room Wins: 100';
        case "99":
            return 'Solved SRM Problems: 1';
        case "100":
            return 'Solved SRM Problems: 10';
        case "101":
            return 'Solved SRM Problems: 50';
        case "102":
            return 'Solved SRM Problems: 200';
        case "103":
            return 'Solved SRM Problems: 500';
        case "104":
            return 'Successful Challenges: 1';
        case "105":
            return 'Successful Challenges: 5';
        case "106":
            return 'Successful Challenges: 25';
        case "107":
            return 'Successful Challenges: 100';
        case "108":
            return 'Successful Challenges: 200';
        case "109":
            return 'Marathon Matches: 1';
        case "110":
            return 'Marathon Matches: 3';
        case "111":
            return 'Marathon Matches: 10';
        case "112":
            return 'Marathon Matches: 20';
        case "113":
            return 'Marathon Matches: 50';
        case "114":
            return 'Marathon Top-5 Placements: 1';
        case "115":
            return 'Marathon Top-5 Placements: 2';
        case "116":
            return 'Marathon Top-5 Placements: 4';
        case "117":
            return 'Marathon Top-5 Placements: 8';
        case "118":
            return 'Marathon Top-5 Placements: 16';
        case "119":
            return 'SRM Winner Div 1';
        case "120":
            return 'SRM Winner Div 2';
        case "121":
            return 'Marathon Match Winner';
        case "122":
            return 'Algorithm Target';
        case "123":
            return 'Marathon Target';
        case "124":
            return 'Algorithm Problem Writer';
        case "125":
            return 'Marathon Copilot / Problem Writer';
        case "126":
            return 'Solved Hard Div1 Problem in SRM';
        case "127":
            return 'Solved Hard Div2 Problem in SRM';
    }
}

/**
 * Render badges.
 *
 * @param categoryName the category name.
 * @param groupRenderDiv the group render div.
 * @param singleRenderDiv the single render div.
 * @param badgesDiv all badges.
 */
function renderGroupBadges(categoryName, groupRenderDiv, singleRenderDiv, badgesDiv) {
    // render group badges
    if (typeof globalBadgeInfo.categorizedBadgeNames[categoryName] != 'undefined') {
        $.each(globalBadgeInfo.categorizedBadgeNames[categoryName], function(index, item) {
            if (typeof item['subBadges'] != 'undefined') {
                var groupDiv = $('<div>');
                
                if (categoryName != 'merit groups') groupDiv.hide(); // hide by default, display later if child badge is actually earned
                groupDiv.addClass('groupBadge');
                groupDiv.addClass(name2cssClass(item.name));

                $.each(item.subBadges, function(ii, it) {
                    var badgeSpan = $('<span>');
                    badgeSpan.addClass('subBadge');
                    badgeSpan.addClass(name2cssClass(it.name));

                    groupDiv.append(badgeSpan);

                    badgeSpan.badgeTooltips({
                        title: it.name,
                        content: it.name//,
                    });
                });

                if(categoryName == 'merit groups') {
                    var tmpDiv = $('<div>');
                    tmpDiv.addClass('subBadge bigBadge');
                    tmpDiv.addClass(name2cssClass(item.name)+"-Group");
                    groupDiv.append(tmpDiv);
                }

                groupRenderDiv.append(groupDiv);
            }
        });
    }

    groupRenderDiv.append($('<div class="clear-float">'));

    var singleCount = 0;

    // show badges
    badgesDiv.find('.quoteBadgesItem').each(function(i, it) {
        var id = $(it).find('.achievementId').val();
        var name = $(it).find('.achievementName').val();
        var desc = $(it).find('.achievementDesc').val();
        var time = '';//earned on: ' + $(it).find('.achievementDate').val();

        if (groupRenderDiv.find('.' + name2cssClass(mapBadge(id))).length > 0) {
            // group badge
            var badgeEl = groupRenderDiv.find('.' + name2cssClass(mapBadge(id)));
            badgeEl.parent().show(); // display parent group
            badgeEl.addClass('selected');
            badgeEl.badgeTooltips({
                title: name,
                content: desc,
                time: time
            });
        } else {
            // single badge
            if (singleRenderDiv != null) {
                var badge = $('<div>');
                badge.addClass('singleBadge');
                badge.addClass(name2cssClass(mapBadge(id)));

                if (singleCount % 3 == 0) {
                    badge.addClass('leftMost');
                }
                singleCount++;

                singleRenderDiv.append(badge);

                badge.badgeTooltips({
                    title: name,
                    content: desc,
                    time: time
                });
            }
        }
    });

    if (singleRenderDiv != null) {
        singleRenderDiv.append('<div class="clear-float"></div>');
    }

    if (categoryName == 'merit groups') {
        $(".groupBadgeDiv .groupBadge").each(function () {
            var allSelected = true;

            $(this).find("span.subBadge").each(function () {
                if (!$(this).hasClass("selected")) {
                    allSelected = false;
                }
            })

            if (allSelected) {
                $(this).find("div.subBadge").addClass("selected");
            } else {
                $(this).find("div.subBadge").removeClass("selected");
            }
        });
    }
}

