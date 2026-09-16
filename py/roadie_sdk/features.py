# Roadie SDK feature factory

from roadie_sdk.feature.base_feature import RoadieBaseFeature
from roadie_sdk.feature.debug_feature import RoadieDebugFeature
from roadie_sdk.feature.idempotency_feature import RoadieIdempotencyFeature
from roadie_sdk.feature.metrics_feature import RoadieMetricsFeature
from roadie_sdk.feature.paging_feature import RoadiePagingFeature
from roadie_sdk.feature.ratelimit_feature import RoadieRatelimitFeature
from roadie_sdk.feature.retry_feature import RoadieRetryFeature
from roadie_sdk.feature.test_feature import RoadieTestFeature
from roadie_sdk.feature.timeout_feature import RoadieTimeoutFeature


_FEATURES = {
    "base": lambda: RoadieBaseFeature(),
    "debug": lambda: RoadieDebugFeature(),
    "idempotency": lambda: RoadieIdempotencyFeature(),
    "metrics": lambda: RoadieMetricsFeature(),
    "paging": lambda: RoadiePagingFeature(),
    "ratelimit": lambda: RoadieRatelimitFeature(),
    "retry": lambda: RoadieRetryFeature(),
    "test": lambda: RoadieTestFeature(),
    "timeout": lambda: RoadieTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
