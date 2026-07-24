# Roadie SDK feature factory

from feature.base_feature import RoadieBaseFeature
from feature.test_feature import RoadieTestFeature


def _make_feature(name):
    features = {
        "base": lambda: RoadieBaseFeature(),
        "test": lambda: RoadieTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
