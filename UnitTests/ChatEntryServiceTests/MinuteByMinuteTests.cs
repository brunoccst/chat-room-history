using DataAccess.Entities;
using DataAccess.Enums;
using DataAccess.Interfaces;
using DataAccess.Services;
using Microsoft.Extensions.DependencyInjection;

namespace UnitTests.ChatEntryServiceTests
{
    [TestClass]
    public class MinuteByMinuteTests
    {
        private readonly TimeInterval timeInterval = TimeInterval.MinuteByMinute;

        #region Same event type

        [TestMethod]
        [TestCategory("NoUser")]
        public void GivenNoUser_WhenNoEventCaused_ThenResultEmptyList()
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
        [DataRow(EventType.EnterTheRoom)]
        [DataRow(EventType.Comment)]
        [DataRow(EventType.HighFiveAnotherUser)]
        [DataRow(EventType.LeaveTheRoom)]
        public void GivenOneUser_WhenCausedEvent_ThenResultIsOneChatEvent(EventType eventType)
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
        [DataRow(EventType.EnterTheRoom)]
        [DataRow(EventType.Comment)]
        [DataRow(EventType.HighFiveAnotherUser)]
        [DataRow(EventType.LeaveTheRoom)]
        public void GivenTwoUsers_WhenFiredEventsAtSameMinute_ThenResultIsOneTimestampGroupWithTwoChatEvents(EventType eventType)
        {
            // Arrange
            var expectedTimestamp = new DateTime(2022, 1, 1, 0, 0, 0);

            var expectedChatEventList = new List<ChatEvent>
            {
                new ChatEvent("Bob", eventType, expectedTimestamp),
                new ChatEvent("Kate", eventType, expectedTimestamp.AddSeconds(59))
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
            Assert.AreEqual(expectedTimestamp, timestampGroup.Timestamp);
            Assert.AreEqual(expectedEventTypeGroupsCount, timestampGroup.EventTypeChatEntryGroups.Count);

            var eventTypeGroup = timestampGroup.EventTypeChatEntryGroups.First();
            Assert.AreEqual(eventType, eventTypeGroup.EventType);
            Assert.AreEqual(expectedChatEventsCount, eventTypeGroup.Events.Count);

            CollectionAssert.AreEqual(expectedChatEventList, eventTypeGroup.Events);
        }

        [TestMethod]
        [TestCategory("MultipleUsers")]
        [DataRow(EventType.EnterTheRoom)]
        [DataRow(EventType.Comment)]
        [DataRow(EventType.HighFiveAnotherUser)]
        [DataRow(EventType.LeaveTheRoom)]
        public void GivenTwoUsers_WhenFiredEventAtDifferentMinutes_ThenResultIsTwoTimestampGroupWithOneChatEventEach(EventType eventType)
        {
            // Arrange
            var expectedTimestamp1 = new DateTime(2022, 1, 1, 0, 0, 0);
            var expectedTimestamp2 = expectedTimestamp1.AddMinutes(1);
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