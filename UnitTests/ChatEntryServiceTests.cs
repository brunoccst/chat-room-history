using DataAccess.Entities;
using DataAccess.Enums;
using DataAccess.Interfaces;
using DataAccess.Services;
using Microsoft.Extensions.DependencyInjection;

namespace UnitTests
{
    [TestClass]
    public class ChatEntryServiceTests
    {
        #region Same event type

        [TestMethod]
        [TestCategory("NoUser")]
        [DataRow(TimeInterval.MinuteByMinute)]
        [DataRow(TimeInterval.Hourly)]
        public void GivenNoUser_WhenNoEventCaused_ThenResultEmptyList(TimeInterval timeInterval)
        {
            // Arrange
            var chatEntryService = new ChatEntryService(new List<ChatEvent>());

            var expectedTimestampGroupsCount = 0;

            // Act
            var result = chatEntryService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedTimestampGroupsCount, result.Count);
        }

        [TestMethod]
        [TestCategory("OneUser")]
        [DataRow(TimeInterval.MinuteByMinute, EventType.EnterTheRoom)]
        [DataRow(TimeInterval.MinuteByMinute, EventType.Comment)]
        [DataRow(TimeInterval.MinuteByMinute, EventType.HighFiveAnotherUser)]
        [DataRow(TimeInterval.MinuteByMinute, EventType.LeaveTheRoom)]
        [DataRow(TimeInterval.Hourly, EventType.EnterTheRoom)]
        [DataRow(TimeInterval.Hourly, EventType.Comment)]
        [DataRow(TimeInterval.Hourly, EventType.HighFiveAnotherUser)]
        [DataRow(TimeInterval.Hourly, EventType.LeaveTheRoom)]
        public void GivenOneUser_WhenCausedEvent_ThenResultIsOneChatEvent(TimeInterval timeInterval, EventType eventType)
        {
            // Arrange
            var expectedChatEvent = new ChatEvent("Bob", eventType, new DateTime());
            var chatEntryService = new ChatEntryService(new List<ChatEvent>
            {
                expectedChatEvent
            });

            var expectedTimestampGroupsCount = 1;
            var expectedEventTypeGroupsCount = 1;
            var expectedChatEventsCount = 1;

            // Act
            var result = chatEntryService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedTimestampGroupsCount, result.Count);

            var timestampGroup = result.First();
            Assert.AreEqual(expectedChatEvent.Timestamp, timestampGroup.Timestamp);
            Assert.AreEqual(expectedEventTypeGroupsCount, timestampGroup.EventTypeChatEntryGroups.Count);

            var eventTypeGroup = timestampGroup.EventTypeChatEntryGroups.First();
            Assert.AreEqual(expectedChatEvent.EventType, eventTypeGroup.EventType);
            Assert.AreEqual(expectedChatEventsCount, eventTypeGroup.Events.Count);

            var chatEvent = eventTypeGroup.Events.First();
            Assert.AreEqual(expectedChatEvent, chatEvent);
        }

        [TestMethod]
        [TestCategory("MultipleUsers")]
        [DataRow(TimeInterval.MinuteByMinute, "2022-01-01T00:00:00", "2022-01-01T00:00:59", EventType.EnterTheRoom)]
        [DataRow(TimeInterval.MinuteByMinute, "2022-01-01T00:00:00", "2022-01-01T00:00:59", EventType.Comment)]
        [DataRow(TimeInterval.MinuteByMinute, "2022-01-01T00:00:00", "2022-01-01T00:00:59", EventType.HighFiveAnotherUser)]
        [DataRow(TimeInterval.MinuteByMinute, "2022-01-01T00:00:00", "2022-01-01T00:00:59", EventType.LeaveTheRoom)]
        [DataRow(TimeInterval.Hourly, "2022-01-01T00:00:00", "2022-01-01T00:59:00", EventType.EnterTheRoom)]
        [DataRow(TimeInterval.Hourly, "2022-01-01T00:00:00", "2022-01-01T00:59:00", EventType.Comment)]
        [DataRow(TimeInterval.Hourly, "2022-01-01T00:00:00", "2022-01-01T00:59:00", EventType.HighFiveAnotherUser)]
        [DataRow(TimeInterval.Hourly, "2022-01-01T00:00:00", "2022-01-01T00:59:00", EventType.LeaveTheRoom)]
        public void GivenTwoUsers_WhenFiredEventsAtSameTimeInterval_ThenResultIsOneTimestampGroupWithTwoChatEvents(TimeInterval timeInterval, string firstTimestampString, string secondTimestampString, EventType eventType)
        {
            // Arrange
            var expectedTimestamp1 = DateTime.Parse(firstTimestampString);
            var expectedTimestamp2 = DateTime.Parse(secondTimestampString);

            var expectedChatEventList = new List<ChatEvent>
            {
                new ChatEvent("Bob", eventType, expectedTimestamp1),
                new ChatEvent("Kate", eventType, expectedTimestamp2)
            };

            var chatEntryService = new ChatEntryService(expectedChatEventList);

            var expectedTimestampGroupsCount = 1;
            var expectedEventTypeGroupsCount = 1;
            var expectedChatEventsCount = 2;

            // Act
            var result = chatEntryService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedTimestampGroupsCount, result.Count);

            var timestampGroup = result.First();
            Assert.AreEqual(expectedTimestamp1, timestampGroup.Timestamp);
            Assert.AreEqual(expectedEventTypeGroupsCount, timestampGroup.EventTypeChatEntryGroups.Count);

            var eventTypeGroup = timestampGroup.EventTypeChatEntryGroups.First();
            Assert.AreEqual(eventType, eventTypeGroup.EventType);
            Assert.AreEqual(expectedChatEventsCount, eventTypeGroup.Events.Count);

            CollectionAssert.AreEqual(expectedChatEventList, eventTypeGroup.Events);
        }

        [TestMethod]
        [TestCategory("MultipleUsers")]
        [DataRow(TimeInterval.MinuteByMinute, "2022-01-01T00:00:00", "2022-01-01T00:01:00", EventType.EnterTheRoom)]
        [DataRow(TimeInterval.MinuteByMinute, "2022-01-01T00:00:00", "2022-01-01T00:01:00", EventType.Comment)]
        [DataRow(TimeInterval.MinuteByMinute, "2022-01-01T00:00:00", "2022-01-01T00:01:00", EventType.HighFiveAnotherUser)]
        [DataRow(TimeInterval.MinuteByMinute, "2022-01-01T00:00:00", "2022-01-01T00:01:00", EventType.LeaveTheRoom)]
        [DataRow(TimeInterval.Hourly, "2022-01-01T00:00:00", "2022-01-01T01:00:00", EventType.EnterTheRoom)]
        [DataRow(TimeInterval.Hourly, "2022-01-01T00:00:00", "2022-01-01T01:00:00", EventType.Comment)]
        [DataRow(TimeInterval.Hourly, "2022-01-01T00:00:00", "2022-01-01T01:00:00", EventType.HighFiveAnotherUser)]
        [DataRow(TimeInterval.Hourly, "2022-01-01T00:00:00", "2022-01-01T01:00:00", EventType.LeaveTheRoom)]
        public void GivenTwoUsers_WhenFiredEventAtDifferentTimeIntervals_ThenResultIsTwoTimestampGroupWithOneChatEventEach(TimeInterval timeInterval, string firstTimestampString, string secondTimestampString, EventType eventType)
        {
            // Arrange
            var expectedTimestamp1 = DateTime.Parse(firstTimestampString);
            var expectedTimestamp2 = DateTime.Parse(secondTimestampString);

            var expectedChatEvent1 = new ChatEvent("Bob", eventType, expectedTimestamp1);
            var expectedChatEvent2 = new ChatEvent("Kate", eventType, expectedTimestamp2);

            var expectedChatEventList = new List<ChatEvent>
            {
                expectedChatEvent1,
                expectedChatEvent2
            };

            var chatEntryService = new ChatEntryService(expectedChatEventList);

            var expectedTimestampGroupsCount = 2;
            var expectedEventTypeGroupsCount = 1;
            var expectedChatEventsCount = 1;

            // Act
            var result = chatEntryService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedTimestampGroupsCount, result.Count);

            var timestampGroup1 = result.First();
            Assert.AreEqual(expectedTimestamp1, timestampGroup1.Timestamp);
            Assert.AreEqual(expectedEventTypeGroupsCount, timestampGroup1.EventTypeChatEntryGroups.Count);

            var eventTypeGroup1 = timestampGroup1.EventTypeChatEntryGroups.First();
            Assert.AreEqual(eventType, eventTypeGroup1.EventType);
            Assert.AreEqual(expectedChatEventsCount, eventTypeGroup1.Events.Count);

            Assert.AreEqual(expectedChatEvent1, eventTypeGroup1.Events.First());

            var timestampGroup2 = result.Last();
            Assert.AreEqual(expectedTimestamp2, timestampGroup2.Timestamp);
            Assert.AreEqual(expectedEventTypeGroupsCount, timestampGroup2.EventTypeChatEntryGroups.Count);

            var eventTypeGroup2 = timestampGroup2.EventTypeChatEntryGroups.First();
            Assert.AreEqual(eventType, eventTypeGroup2.EventType);
            Assert.AreEqual(expectedChatEventsCount, eventTypeGroup2.Events.Count);

            Assert.AreEqual(expectedChatEvent2, eventTypeGroup2.Events.First());
        }

        #endregion
    }
}