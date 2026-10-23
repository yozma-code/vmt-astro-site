import yaml
import os
import sys

# 直接从 mihomo 目录读取现有的配置文件（它其实就在那里）
source_file = os.path.expanduser('~/.config/mihomo/config.yaml')
target_file = os.path.expanduser('~/.config/mihomo/config_clean.yaml')

if not os.path.exists(source_file):
    print(f"❌ 找不到源文件: {source_file}")
    sys.exit(1)

try:
    with open(source_file, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
except Exception as e:
    print(f"❌ YAML 解析失败: {e}")
    sys.exit(1)

valid_proxies = []
for p in data.get('proxies', []):
    if not isinstance(p, dict):
        continue
    # 严格检查必备字段
    if all(k in p for k in ['name', 'type', 'server', 'port']):
        if str(p['type']).lower() != 'anytls':
            valid_proxies.append(p)

if not valid_proxies:
    print("❌ 没有找到任何合法节点！")
    sys.exit(1)

# 生成极简配置：全局模式
new_config = {
    'mixed-port': 7890,
    'allow-lan': True,
    'mode': 'global',
    'log-level': 'info',
    'proxies': valid_proxies
}

with open(target_file, 'w', encoding='utf-8') as f:
    yaml.dump(new_config, f, default_flow_style=False, allow_unicode=True)

print(f"✅ 成功提取了 {len(valid_proxies)} 个合法节点，并生成了 clean 配置文件！")
