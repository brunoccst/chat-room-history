using DataAccess.Entities;
using DataAccess.Enums;
using DataAccess.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTests
{
    [TestClass]
    public class ChatEventServiceTests
    {
        [TestMethod]
        [DataRow(TimeInterval.MinuteByMinute)]
        [DataRow(TimeInterval.Hourly)]
        public void GivenNoEvent_WhenEmptySource_ThenResultEmptyGroupList(TimeInterval timeInterval)
        {
            // Arrange
            var expectedEventList = new List<ChatEvent>();
            var chatEventService = new ChatEventService(expectedEventList);

            // Act
            var result = chatEventService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedEventList.Count, result.Count, timeInterval.ToString());
        }

        [TestMethod]
        [DataRow(TimeInterval.MinuteByMinute, EventType.Comment)]
        [DataRow(TimeInterval.MinuteByMinute, EventType.EnterTheRoom)]
        [DataRow(TimeInterval.Hourly, EventType.HighFiveAnotherUser)]
        public void GivenOneEvent_WhenSourceHasOneEvent_ThenResultIsOneGroupWithOneEvent(TimeInterval timeInterval, EventType eventType)
        {
            // Arrange
            var expectedTimestamp = new DateTime();
            var expectedEventType = EventType.EnterTheRoom;
            var expectedChatEvent = new ChatEvent("Bob", expectedEventType, expectedTimestamp);
            var expectedEventList = new List<ChatEvent> { expectedChatEvent };
            var expectedGroupCount = 1;
            var chatEventService = new ChatEventService(expectedEventList);

            // Act
            var result = chatEventService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedGroupCount, result.Count);

            var group = result.First();
            Assert.AreEqual(expectedTimestamp, group.Timestamp);
            Assert.AreEqual(expectedEventType, group.EventType);
            Assert.AreEqual(expectedEventList.Count, group.ChatEvents.Count);

            var chatEvent = group.ChatEvents.First();
            Assert.AreEqual(expectedChatEvent, chatEvent);
        }

        [TestMethod]
        [DataRow("2022-01-01T00:00:00", EventType.EnterTheRoom)]
        [DataRow("2022-01-01T23:59:59", EventType.Comment)]
        [DataRow("2022-12-31T00:00:00", EventType.HighFiveAnotherUser)]
        [DataRow("2023-01-01T00:00:00", EventType.LeaveTheRoom)]
        public void GivenTwoEvents_WhenAtSameTimestampAndSameEventType_ThenResultIsOneGroupOfSameTimestampAndSameEventTypeWithTwoEntries(string timestampString, EventType eventType)
        {
            // Arrange
            var timestamp = DateTime.Parse(timestampString);
            var expectedUserName = "Bob";
            var expectedChatEventList = new List<ChatEvent>
            {
                new ChatEvent(expectedUserName, eventType, timestamp),
                new ChatEvent(expectedUserName, eventType, timestamp)
            };
            var expectedTimeInterval = TimeInterval.MinuteByMinute;
            var expectedTimestampGivenTimeInterval = timestamp.AddSeconds(-timestamp.Second);
            var expectedGroupCount = 1;
            var chatEventService = new ChatEventService(expectedChatEventList);

            // Act
            var result = chatEventService.GetChatEntries(expectedTimeInterval);

            // Assert
            Assert.AreEqual(expectedGroupCount, result.Count);

            var group = result.First();
            Assert.AreEqual(expectedTimestampGivenTimeInterval, group.Timestamp);
            Assert.AreEqual(eventType, group.EventType);
            Assert.AreEqual(expectedChatEventList.Count, group.ChatEvents.Count);

            Assert.AreEqual(expectedChatEventList.First(), group.ChatEvents.First());
            Assert.AreEqual(expectedChatEventList.Last(), group.ChatEvents.Last());
        }

        [TestMethod]
        [DataRow("2022-01-01T00:00:00", "2022-01-01T00:01:00", TimeInterval.MinuteByMinute)]
        [DataRow("2022-01-01T00:01:00", "2022-01-01T00:00:00", TimeInterval.MinuteByMinute)]
        [DataRow("2022-01-01T01:00:00", "2022-01-01T00:00:00", TimeInterval.Hourly)]
        [DataRow("2022-01-01T00:00:00", "2022-01-01T01:00:00", TimeInterval.Hourly)]
        public void GivenTwoEvents_WhenAtDifferentTimestamps_ThenResultIsTwoGroupsOfDifferentTimestampsWithOneEventEach(string timestampString1, string timestampString2, TimeInterval timeInterval)
        {
            // Arrange
            var timestamp1 = DateTime.Parse(timestampString1);
            var timestamp2 = DateTime.Parse(timestampString2);
            var expectedUserName = "Bob";
            var expectedEventType = EventType.EnterTheRoom;
            var expectedChatEventList = new List<ChatEvent>
            {
                new ChatEvent(expectedUserName, expectedEventType, timestamp1),
                new ChatEvent(expectedUserName, expectedEventType, timestamp2)
            };
            var orderedExpectedChatEventList = OrderList(expectedChatEventList);
            var expectedChatEvent1 = orderedExpectedChatEventList.First();
            var expectedChatEvent2 = orderedExpectedChatEventList.Last();
            var expectedGroupCount = 2;
            var expectedChatEventCount = 1;
            var chatEventService = new ChatEventService(expectedChatEventList);

            // Act
            var result = chatEventService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedGroupCount, result.Count);

            var group1 = result.First();
            Assert.AreEqual(expectedChatEvent1.Timestamp, group1.Timestamp);
            Assert.AreEqual(expectedChatEvent1.EventType, group1.EventType);
            Assert.AreEqual(expectedChatEventCount, group1.ChatEvents.Count);

            var group2 = result.Last();
            Assert.AreEqual(expectedChatEvent2.Timestamp, group2.Timestamp);
            Assert.AreEqual(expectedChatEvent2.EventType, group2.EventType);
            Assert.AreEqual(expectedChatEventCount, group2.ChatEvents.Count);
        }

        [TestMethod]
        [DataRow(EventType.EnterTheRoom, EventType.Comment, TimeInterval.MinuteByMinute)]
        [DataRow(EventType.Comment, EventType.EnterTheRoom, TimeInterval.MinuteByMinute)]
        [DataRow(EventType.HighFiveAnotherUser, EventType.LeaveTheRoom, TimeInterval.Hourly)]
        public void GivenTwoEvents_WhenAtDifferentEventTypes_ThenResultIsTwoGroupsOfDifferentEventTypesWithOneEventEach(EventType eventType1, EventType eventType2, TimeInterval timeInterval)
        {
            // Arrange
            var expectedTimestamp = new DateTime();
            var expectedUserName = "Bob";
            var expectedChatEventList = new List<ChatEvent>
            {
                new ChatEvent(expectedUserName, eventType1, expectedTimestamp),
                new ChatEvent(expectedUserName, eventType2, expectedTimestamp)
            };
            var orderedExpectedChatEventList = OrderList(expectedChatEventList);
            var expectedChatEvent1 = orderedExpectedChatEventList.First();
            var expectedChatEvent2 = orderedExpectedChatEventList.Last();
            var expectedGroupCount = 2;
            var expectedChatEventCount = 1;
            var chatEventService = new ChatEventService(expectedChatEventList);

            // Act
            var result = chatEventService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedGroupCount, result.Count);

            var group1 = result.First();
            Assert.AreEqual(expectedChatEvent1.Timestamp, group1.Timestamp);
            Assert.AreEqual(expectedChatEvent1.EventType, group1.EventType);
            Assert.AreEqual(expectedChatEventCount, group1.ChatEvents.Count);

            var group2 = result.Last();
            Assert.AreEqual(expectedChatEvent2.Timestamp, group2.Timestamp);
            Assert.AreEqual(expectedChatEvent2.EventType, group2.EventType);
            Assert.AreEqual(expectedChatEventCount, group2.ChatEvents.Count);
        }

        [TestMethod]
        [DataRow("2022-01-01T00:00:00", "2022-01-01T00:01:00", EventType.EnterTheRoom, EventType.Comment, TimeInterval.MinuteByMinute)]
        [DataRow("2022-01-01T00:01:00", "2022-01-01T00:00:00", EventType.EnterTheRoom, EventType.Comment, TimeInterval.MinuteByMinute)]
        [DataRow("2022-01-01T00:00:00", "2022-01-01T00:01:00", EventType.Comment, EventType.EnterTheRoom, TimeInterval.MinuteByMinute)]
        [DataRow("2022-01-01T00:01:00", "2022-01-01T00:00:00", EventType.Comment, EventType.EnterTheRoom, TimeInterval.MinuteByMinute)]
        [DataRow("2022-01-01T00:00:00", "2022-01-01T01:00:00", EventType.EnterTheRoom, EventType.Comment, TimeInterval.Hourly)]
        public void GivenTwoEvents_WhenAtDifferentTimestampsAndDifferentEventTypes_ThenResultIsTwoGroupsOfDifferentTimestampsAndDifferentEventTypesWithOneEventEach(string timestampString1, string timestampString2, EventType eventType1, EventType eventType2, TimeInterval timeInterval)
        {
            // Arrange
            var timestamp1 = DateTime.Parse(timestampString1);
            var timestamp2 = DateTime.Parse(timestampString2);
            var expectedUserName = "Bob";
            var expectedChatEventList = new List<ChatEvent>
            {
                new ChatEvent(expectedUserName, eventType1, timestamp1),
                new ChatEvent(expectedUserName, eventType2, timestamp2)
            };
            var orderedExpectedChatEventList = OrderList(expectedChatEventList);
            var expectedChatEvent1 = orderedExpectedChatEventList.First();
            var expectedChatEvent2 = orderedExpectedChatEventList.Last();
            var expectedGroupCount = 2;
            var expectedChatEventCount = 1;
            var chatEventService = new ChatEventService(expectedChatEventList);

            // Act
            var result = chatEventService.GetChatEntries(timeInterval);

            // Assert
            Assert.AreEqual(expectedGroupCount, result.Count);

            var group1 = result.First();
            Assert.AreEqual(expectedChatEvent1.Timestamp, group1.Timestamp);
            Assert.AreEqual(expectedChatEvent1.EventType, group1.EventType);
            Assert.AreEqual(expectedChatEventCount, group1.ChatEvents.Count);

            var group2 = result.Last();
            Assert.AreEqual(expectedChatEvent2.Timestamp, group2.Timestamp);
            Assert.AreEqual(expectedChatEvent2.EventType, group2.EventType);
            Assert.AreEqual(expectedChatEventCount, group2.ChatEvents.Count);
        }

        [TestMethod]
        [DataRow("2022-01-01T00:00:00", "2022-01-01T00:01:00", "2022-01-01T00:02:00")] // 00 01 02
        [DataRow("2022-01-01T00:01:00", "2022-01-01T00:02:00", "2022-01-01T00:00:00")] // 01 02 00
        [DataRow("2022-01-01T00:02:00", "2022-01-01T00:00:00", "2022-01-01T00:01:00")] // 02 00 01
        [DataRow("2022-01-01T00:00:00", "2022-01-01T00:02:00", "2022-01-01T00:01:00")] // 00 02 01
        [DataRow("2022-01-01T00:01:00", "2022-01-01T00:00:00", "2022-01-01T00:02:00")] // 01 00 02
        [DataRow("2022-01-01T00:02:00", "2022-01-01T00:01:00", "2022-01-01T00:00:00")] // 02 01 00
        public void GivenThreeEvents_WhenAtDifferentTimestamps_ThenResultIsThreeGroupsOfDifferentTimestampsOrderedByTimestampWithOneEventEach(string timestampString1, string timestampString2, string timestampString3)
        {
            // Arrange
            var timestamp1 = DateTime.Parse(timestampString1);
            var timestamp2 = DateTime.Parse(timestampString2);
            var timestamp3 = DateTime.Parse(timestampString3);
            var expectedUserName = "Bob";
            var expectedEventType = EventType.EnterTheRoom;
            var expectedChatEventList = new List<ChatEvent>
            {
                new ChatEvent(expectedUserName, expectedEventType, timestamp1),
                new ChatEvent(expectedUserName, expectedEventType, timestamp2),
                new ChatEvent(expectedUserName, expectedEventType, timestamp3),
            };
            var orderedExpectedChatEventList = OrderList(expectedChatEventList);
            var expectedChatEvent1 = orderedExpectedChatEventList[0];
            var expectedChatEvent2 = orderedExpectedChatEventList[1];
            var expectedChatEvent3 = orderedExpectedChatEventList[2];
            var expectedTimeInterval = TimeInterval.MinuteByMinute;
            var expectedGroupCount = 3;
            var expectedChatEventCount = 1;
            var chatEventService = new ChatEventService(expectedChatEventList);

            // Act
            var result = chatEventService.GetChatEntries(expectedTimeInterval);

            // Assert
            Assert.AreEqual(expectedGroupCount, result.Count);

            var group1 = result[0];
            Assert.AreEqual(expectedChatEvent1.Timestamp, group1.Timestamp);
            Assert.AreEqual(expectedChatEvent1.EventType, group1.EventType);
            Assert.AreEqual(expectedChatEventCount, group1.ChatEvents.Count);

            var group2 = result[1];
            Assert.AreEqual(expectedChatEvent2.Timestamp, group2.Timestamp);
            Assert.AreEqual(expectedChatEvent2.EventType, group2.EventType);
            Assert.AreEqual(expectedChatEventCount, group2.ChatEvents.Count);

            var group3 = result[2];
            Assert.AreEqual(expectedChatEvent3.Timestamp, group3.Timestamp);
            Assert.AreEqual(expectedChatEvent3.EventType, group3.EventType);
            Assert.AreEqual(expectedChatEventCount, group3.ChatEvents.Count);
        }

        private List<ChatEvent> OrderList(List<ChatEvent> list)
        {
            return list.OrderBy(c => c.Timestamp).ThenBy(c => c.EventType).ToList();
        }
    }
}